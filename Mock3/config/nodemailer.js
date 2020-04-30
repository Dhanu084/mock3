const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path')

let transporter = nodemailer.createTransport({
    service:'Gmail',
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    auth:{
        user:'',
        pass:''
    }
});

let renderTemplate = (data,relativePath) =>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        function(err,template){
            if(err){
                console.log("error in rendering temlate",err);
                return;
            }
            mailHTML = template;

        }
    )

    return mailHTML;
}
//console.log(transporter);
module.exports = {transporter,renderTemplate};
