const express = require('express');
const port = 8000;
const app = express();
const cookieParser = require('cookie-parser');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy'); 
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const customMware = require('./config/middleware');
const bcrypt = require('bcrypt');

app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('./assets'));
app.set('view-engine','ejs');
app.set('views','./views');

app.use(session({
    name:'authenticate',
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store:new MongoStore({
            mongooseConnection : db,
            autoRemove:'disabled'
    },function(err){
        console.log(err || 'connect-mongodb setup ok');
    })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());//needs to be used after session
app.use(customMware.setFlash);
app.use('/',require('./routes'));
app.listen(port,function (err){
    if(err){
        console.log(err);
        return;
    }
})