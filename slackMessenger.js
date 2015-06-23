var request = require('request');
var _ = require('underscore');

exports.sendSlackMsg = function(slo, cb) {
	var slackOptions = _.extend({
		username: "notification-action",
		channel:"@santi",
        text: 'hola probando desde la api 2', // plaintext body
    }, slo);
	
	/*request.post('https://hooks.slack.com/services/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').form({
		payload: JSON.stringify(slackOptions)
	}).on('error', function(e){
		console.log('request post slack failed with following error');
		console.log(e);
	});*/
	
	request({
	    url: 'https://hooks.slack.com/services/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',
		method: 'POST',
		form: {payload:JSON.stringify(slackOptions)},
    },function(error, response, body){
		if (!error && response.statusCode == 200) {
		    console.log(body);
			cb(body);
		} else {
			console.log('request post slack failed with following error');
			console.log(error);
			cb(error);
		}
	});
	
	console.log("sending slack msg with these options:");
	console.log(JSON.stringify(slackOptions));
};

