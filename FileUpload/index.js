const express = require('express');
const app = express();
const port = 8000;
const multer = require('multer');
const mongoose = require('./config/mongoose');
const workbook = require('workbook');
app.use(express.urlencoded());

app.use('/uploads',express.static(__dirname+'/uploads'));//tell express where the uploads directory resides
app.use(express.static('./assets'));//tell express where the static files reside
app.use('/',require('./routes'));//requring routes

app.listen(port,function(err){
    if(err){
        console.log(err);
        return;
    }
})