'use strict';
const nodemailer = require('nodemailer');
const responseGenerator = require('./../libs/responseGenerator');
const userModel = require('./../models/user.model');
// Generate test SMTP service account from ethereal.email

exports.sendEmail = function(req,res){
  userModel.findOne({"email":req.query.email},function(err,user){
    if(user){
      nodemailer.createTestAccount(function(err, account){

        const transporter = nodemailer.createTransport({
          host: 'smtp.ethereal.email',
          port: 587,
          auth: {
            // use these credentials to login on https://ethereal.email
            user: 'rcwkybo22n7vfqiv@ethereal.email',
            pass: 'T7rDp5egTezqN1czM3'
          }
        });

        // setup email data with unicode symbols
        let mailOptions = {
          from: '"amazon" <support@amazon.com>', // sender address
          to: user.email, // list of receivers
          subject: 'password reset', // Subject line
          text: 'Here\'s the password: '+user.password, // plain text body
          html: '<b>Here\'s the password: </b>'+user.password // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            return console.log(error);
          }
          console.log('Message sent: %s', info.messageId);
          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

          let response = responseGenerator.respGen(false,'mail sent. Check your email to recover password',200,null);
          res.send(response);
        });
      });
    }
    else{
      let response = responseGenerator.respGen(true,'No account is associated with this email. Try again',200,null);
      res.send(response);
    }
  })
  
}
