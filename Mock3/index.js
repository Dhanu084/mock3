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
const request = require('request');
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
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




// const secretKey = '6LfJXuoUAAAAAHZcSWf8LWjdIKUBeeLE6ry4DVn2';
// const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${token}`;

app.use('/',require('./routes'));

app.post('/captcha', passport.authenticate(
    'local',
    {failureRedirect:'/'}
),async function(req, res) {
   
    var secretKey = "6LfJXuoUAAAAAHZcSWf8LWjdIKUBeeLE6ry4DVn2";
    console.log(req.body['g-recaptcha-response']);
    if(req.body === undefined || req.body === '' || req.body === null)
  {
      console.log("req.body ", req.body);
      req.flash('error','reCAPTCHA Incorrect');
      return res.redirect('back');
  }
  
  try{
      //verification URL
    const verificationURL = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;
    //check if captcha is valid
     await request(verificationURL, async function(error, response, body) {
        body = JSON.parse(body);
        //If not succesful
        if(body.success !== undefined && !body.success) {
        console.log("responseError Failed captcha verification");
        req.flash('error','Failed captcha verification');
        return res.redirect('/user/signin');
        }
        req.flash('success','logged in successfully');
        res.redirect('/user/user-detail');
     });
    }
    catch(err){
        req.flash('error','Failed captcha verification');
        res.redirect('/user/signin')
    }
  });

  
app.listen(port,function (err){
    if(err){
        console.log(err);
        return;
    }
})