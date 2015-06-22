var express = require('express');
var router = express.Router();
var mailer = require('../mailer.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.render('help', { });
});

router.post('/sendEmail', function(req, res, next){
	mailer.sendMail({
	    subject: req.body.subject,
		html: req.body.html,
		to: req.body.to,
	});
	
	res.send('sending email using post and sending subject');
});

module.exports = router;
