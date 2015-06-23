var nodemailer = require('nodemailer');
var _ = require('underscore');

// create reusable transporter object using SMTP transport
/*
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'q3etcteam4@gmail.com',
        pass: 'its a secret to everybody'
    }
});
*/

var smtpServer = process.env.SMTP_SERVER || "smtp-americas.hp.com";
var defaultFrom = process.env.ETC_FROM || "etc3Team4@hp.com";

var transporter = nodemailer.createTransport({
   host: smtpServer
});

console.log("smtpServer=" + smtpServer);
console.log("defaultFrom=" + defaultFrom);

exports.sendMail = function(mailOptions){
    // send mail with defined transport object
    var theEmailOptions = _.extend({
        from: defaultFrom, // sender address, is ignored by gmail
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


