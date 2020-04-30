const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/authenticate_users');

const db = mongoose.connection;

db.on('error',console.error.bind(console,"Error in connecting to DB"));

db.once('open',function(){
    console.log("Connected to DB");
})

module.exports = db;