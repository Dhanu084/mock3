const User = require('../models/user');
const bcrypt = require('bcrypt');
const passwordMailer = require('../mailers/password_mailer');

let currentUser;
module.exports.signup = function (req,res){
    res.render('signup.ejs');
}

module.exports.signin = function(req,res){
    res.render('signin.ejs');
}

module.exports.createUser = async function(req,res){
    //console.log(req.body.password == req.body.confirm_password);
    if(req.body.password!=req.body.confirm_password){
        req.flash('error','Passwords don\'t match');
        res.redirect('/');
    }
    try{
        
        req.body.password = bcrypt.hashSync(req.body.password,10);
        await User.create({
            email:req.body.email,
            password:req.body.password
        });
        req.flash('success',req.body.email+'signed up successfully');
        res.redirect('/user/signin');
    }
    catch(err){
        req.flash('error','user already exist');
        return res.redirect('back');
    }
    
    
}

module.exports.createSession = function(req,res){
    req.flash('success','logged in successfully');
    res.redirect('/user/user-detail');
}

module.exports.userDetail = function(req,res){
    res.render('user_detail.ejs');
}

module.exports.signout = function(req,res){
    req.logout();
    req.flash('success','logged out successfully');
    res.redirect('/user/signin');
}

module.exports.forgotPassword = function(req,res){
    res.render('generate_email.ejs');
}

module.exports.generate_email = async function(req,res){
    try{
        let user = await User.findOne({email:req.body.email});
        //console.log(user+" "+req.body.email);
        currentUser = user;
        passwordMailer.newPassword(user)
        res.redirect('back');
    }
    catch(err){
        console.log(err);
        req.flash('error',err);
        res.redirect('back');
    }
    
}

module.exports.resetPassword = async function(req,res){
    //console.log(currentUser);
    res.render('reset_password.ejs',{currentUser:currentUser});
}

module.exports.changePassword = async function(req,res){
    console.log(req.params);
    console.log(req.body.password)
    try{
        req.body.password = bcrypt.hashSync(req.body.password,10);
        let user= await User.findOneAndUpdate({email:req.params.email},{password:req.body.password})
        //console.log('user',user);
        req.flash('success','password changed successfully');
        res.redirect('/user/signin');
    }
    catch(err){
        console.log(err);
        return;
    }
    
}