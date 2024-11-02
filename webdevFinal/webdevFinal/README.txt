Youtube Video: https://youtu.be/zUdh0dqIqCA


My application is an ‘inconvenient journal’ where users will submit text entries that will be saved into a database and when they log in one of their journal entries will randomly be provided for them. 


Originally and in my final proposal, I was planning to create a calendar application but this changed over the process of writing my application.


My program consists of a server.js file which handles the different views and functionality of my project. This file connects to my “views” folder which holds the files for all of the webpages in my project:


        Login.ejs : this file is responsible for allowing users to log in based off of the email and password that is imputed in its fields


        Register.ejs : this file allows users to sign up for an account by providing a username, email, and password which is then uploaded into a sql database that holds this information for them


        Index.ejs : this file is responsible for providing users with the view they receive upon logging in. this will show them their email along with a random journal entry


        Input.ejs: this file allows users to input entries into the database that holds their previous entries based off of their emails.




The node modules used for this project are as follows:
   "bcrypt": "^5.1.0",
   "ejs": "^3.1.8",
   "express": "^4.18.2",
   "express-flash": "^0.0.2",
   "express-session": "^1.17.3",
   "method-override": "^3.0.0",
   "mysql2": "^2.3.3",
   "passport": "^0.6.0",
   "passport-local": "^1.0.0",
   "session": "^0.1.0"
   "dotenv": "^16.0.3",
   "nodemon": "^2.0.20"


These dependencies are what allows node to run with session and login capabilities, as well as providing mysql support


The framework used for my project is the w3 schools framework.


I used the nodejslogin assignment as a jumping off point for this project so any dependencies or files that were included in there are left over in this application.