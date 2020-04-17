const User = require('../models/user');
const bcrypt = require('bcrypt');

module.exports.signup = function (req,res){
    res.render('signup.ejs');
}

module.exports.signin = function(req,res){
    res.render('signin.ejs');
}

module.exports.createUser = async function(req,res){
    
    try{
        req.body.password = bcrypt.hashSync(req.body.password,10);
        await User.create(req.body);
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