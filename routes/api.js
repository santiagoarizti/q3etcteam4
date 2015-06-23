var express = require('express');
var router = express.Router();
var mailer = require('../mailer.js');
var actions = require('../actions.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.render('help', { });
});

/* GET users listing. */
router.get('/getDelta', function(req, res, next) {
	var data = actions.getDelta(req.query.lastChanged);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(data));
});

router.get('/getAction', function (req, res, next) {
    var data = actions.getAction(req.query.actionId);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(data));
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
