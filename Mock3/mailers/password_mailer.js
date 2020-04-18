const nodemailer = require('../config/nodemailer');

exports.newPassword = (user) =>{
    let htmlString = nodemailer.renderTemplate({user:user},'/view_mailers/password_mailer.ejs');
    nodemailer.transporter.sendMail({
        from:'dhanushkiran902@gmail.com',
        to:user.email,
        subject:'Reset password',
        html:htmlString
    })
    ,(err,info)=>{
        if(err){
            console.log("Error in sendinh mail",err);
            return;
        }
        console.log("Message sent",info);
        return;
    }
}