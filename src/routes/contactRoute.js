var express = require('express')
var router = express.Router()
var multer = require('multer');
var upload = multer(); // for parsing multipart/form-data
var nodemailer = require('nodemailer');
var mg = require('nodemailer-mailgun-transport');
var auth =  require('../../config.json');


router.post('/contactSubmit', upload.array(), function (req, res) {

    var name = req.body.name;
    var email = req.body.email;
    var comment = req.body.comment;
    var response;

    console.log('\nCONTACT FORM DATA: '+ name + ' '+ email + ' '+ comment +'\n');
    
    // create transporter object capable of sending email using the default SMTP transport
    var transporter = nodemailer.createTransport(mg(auth));
  
    // setup e-mail data with unicode symbols
    var mailOptions = {
      from: '"'+ name + '" <' + email + '>', // sender address
      to: 'goon2006@gmail.com', // list of receivers
      subject: 'Message from Website Contact page', // Subject line
      text: comment
    };
    // send mail with defined transport object
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log('\nERROR: ' + error+'\n');
        response= JSON.stringify({ yo: 'error' });
      } else {
        console.log('\nRESPONSE SENT: ' + info.response +'\n');
        response= JSON.stringify({ yo: info.response });
      }
    });

    res.setHeader('content-type', 'application/json');
    res.end(response);
})

module.exports = router;
