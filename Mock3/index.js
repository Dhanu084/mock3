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




//const secretKey = '6LfJXuoUAAAAAHZcSWf8LWjdIKUBeeLE6ry4DVn2';
//const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${token}`;

app.use('/',require('./routes'));

// app.post('/captcha', function(req, res) {
//     //console.log(req.body['g-recaptcha-response']);
//     // if(req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null)
//     // {
//     //   return res.json({"responseError" : "something goes to wrong"});
//     // }
//     var secretKey = "6LfJXuoUAAAAAHZcSWf8LWjdIKUBeeLE6ry4DVn2";
//     var response = JSON.stringify(req.body['g-recaptcha-response']);
//     var user_ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
//     request({
//         url: 'https://www.google.com/recaptcha/api/siteverify?secret='+secretKey+'&response='+response+'&remoteip='+user_ip,
//         method: 'POST',
//         //      
//     }, function (err, response, body) {
//         if (err) {
//             res.status(500).send({
//                 error: "Could not verify captcha"
//             });
//         } else {
//             res.status(200).send({
//                 message: body
//             });
//         }
//     });
//   });

  
app.listen(port,function (err){
    if(err){
        console.log(err);
        return;
    }
})