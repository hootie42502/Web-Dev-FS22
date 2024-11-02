if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}


const express = require('express')
const app = express()
const port = 3000

const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')

const usrs = []

const createPassport = require('./passportConfig')
createPassport(
    passport,
    email => usrs.find(user.email === email),
    id => usrs.find(user.id === id)
)

app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false}))

app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

app.get('/', (req, res) => res.render('index.ejs',{name: 'Eric'}))

app.use(express.static('public'))
app.use('/css',express.static(__dirname + 'public/CSS'))
app.use('/js',express.static(__dirname + 'public/JS'))

app.get('/login',(req, res) => res.render('login.ejs'))
app.post('/login', (req,res) => {

})

app.get('/register',(req, res) => res.render('register.ejs'))
app.post('/register', async (req,res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 8)
        usrs.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        res.redirect('login')
    } catch {
        res.redirect('/register')
    }
    console.log(usrs)
    
})



app.listen(port, () => console.log(`Example app listening on port ${port}!`))