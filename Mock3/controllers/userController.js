const User = require('../models/user');
module.exports.signup = function (req,res){
    res.render('signup.ejs');
}

module.exports.signin = function(req,res){
    res.render('signin.ejs');
}

module.exports.createUser = async function(req,res){
    let user = await User.create(req.body);
    //console.log(user);
    res.redirect('/user/signin');
}

module.exports.createSession = function(req,res){
    res.redirect('/user/user-detail');
}

module.exports.userDetail = function(req,res){
    res.render('user_detail.ejs');
}

module.exports.signout = function(req,res){
    req.logout();
    res.redirect('/user/signin');
}