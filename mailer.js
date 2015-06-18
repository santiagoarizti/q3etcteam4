var nodemailer = require('nodemailer');
var _ = require('underscore');

// create reusable transporter object using SMTP transport

var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'q3etcteam4@gmail.com',
        pass: 'its a secret to everybody'
    }
});

exports.sendMail = function(mailOptions){
    // send mail with defined transport object
    var theEmailOptions = _.extend({
        from: 'auto', // sender address, is ignored by gmail
        //to: 'input, baz@blurdybloop.com', // list of receivers
        subject: 'Mail from Node', // Subject line
        //text: 'unused', // plaintext body
        html: '<b>Mail from node in html format</b>' // html body
    }, mailOptions);
    
    transporter.sendMail(theEmailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    
    });
    
    console.log('Sending email with following options:');
    console.log(theEmailOptions);
};


