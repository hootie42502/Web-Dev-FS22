if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}



const express = require('express')
const app = express()
const port = 3000

const bcrypt = require('bcrypt')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const mysql = require("mysql2")

const pool = mysql.createPool({
    host:"localhost",
    user:"root",
    password: "Rickyticky305!",
    database: "WebDev"
})


app.set('view-engine', 'ejs')

app.use(express.urlencoded({extended:false}))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())



passport.use('local', new LocalStrategy({
    emailField: 'email',
    passwordField: 'password',
    passReqToCallback: true //passback entire req to call back
  } , function (req, email, password, done){
        if(!email || !password ) { return done(null, false, req.flash('message','All fields are required.')); }
        pool.query("select * from user where email = ?", [email], function(err, rows){
            console.log(err); 
            console.log(rows);
          if (err) return done(req.flash('message',err));
          if(!rows.length){ return done(null, false, req.flash('message','Invalid username or password.')); }

          var encPassword = bcrypt.hash(password, 8);
          var dbPassword  = rows[0].password;

          if(!(dbPassword == encPassword)){
              return done(null, false, req.flash('message','Invalid username or password.'));
           }
          return done(null, rows[0]);
        });
      }
));


app.use(methodOverride('_method'))

app.get('/', (request, result) => {
    
    result.render('index.ejs',{name: request.flash('email'), text: request.flash('entry')})
})

app.get('/input', (request, result) => {
    result.render('input.ejs',{name: request.flash('email')})
})

app.post('/input', (req,res) => {
    var id = Date.now() / 10000
    var entry = req.body.entry
    var email = req.flash('email')

    var sql = `INSERT INTO WebDev.textEntries (userEmail, id, entry) VALUES (?)`
    var values = [
        [`eric@yahoo`, id, `${entry}`]
    ]
    pool.query(sql, values)
    req.flash('email','eric@yahoo')
    res.redirect('/input')
})

app.post('/inputt', (req,res) => {
    req.flash('email','eric@yahoo')
    res.redirect('/input')
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.get('/login',checkNotAuthenticated, (req, res) => res.render('login.ejs'))
//app.post('/login',checkNotAuthenticated, passport.authenticate('local', {
//    successRedirect: '/index',
//    failureRedirect: '/login',
//    failureFlash: true
//}))
app.post('/login', checkNotAuthenticated, (request,result) =>{
    request.session.email = request.body.email
    
    var sql = `SELECT * FROM textEntries WHERE textEntries.userEmail = ? ORDER BY RAND() LIMIT 1 `
    var values = [
        [ `${request.body.email}`]
    ]
    pool.query(sql, values, (err,res,fields) => {
        console.log(res)
        request.flash('entry',res[0].entry)
        request.flash('email',res[0].userEmail)
        result.redirect('/')
        
    })
    
    
   
})


app.get('/register',checkNotAuthenticated, (req, res) => res.render('register.ejs'))
app.post('/register',checkNotAuthenticated, async (req, res) =>{
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 8)
        var id = Date.now() / 10000
        var name = req.body.name
        var email = req.body.email
        var password = hashedPassword

        var sql = `INSERT INTO WebDev.user (iduser, email, name, password) VALUES (?)`
        var values = [
            [ id, `${email}`, `${name}`, `${password}`]
        ]
        pool.query(sql, values)
        res.redirect('/login')
    } catch {
        res.redirect('/register')
    }
    //console.log(usrs)
     
})

app.delete('/logout', (req,res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/login');
      });
})


function checkAuthenticated(req,res,next) {
    if(req.isAuthenticated()) {
        return next()
    }

    res.redirect('/login')
}

function checkNotAuthenticated(req,res,next) {
    if(req.isAuthenticated()) {
        return res.redirect('/')
    }

    next()
}