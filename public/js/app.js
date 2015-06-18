var app = angular.module('mainApp', ['ngSanitize']);

app.controller('mainCtrl', function($http, $sanitize){
	var model = this;
	model.subject = '';
	model.to = '';
	model.html = '';
	
	model.sending = false;
	
	model.sanitizedHtml = function(){
		try {
			return $sanitize(model.html);
		} catch (error) {
			return '';
		}
		return '';
	};
	
	model.sendEmail = function () {
		model.sending = true;
		$http.post('/api/sendEmail', {
			subject: model.subject,
			to: model.to,
			html: model.sanitizedHtml()
		}).
		success(function(data, status, headers, config) {
			model.clearForm();
			model.sending = false;
		}).error(function(){
			model.sending = false;			
		});
	};
	
	model.clearForm = function(){
		model.subject = '';
		model.to = '';
		model.html = '';
		model.sending = false;
	};
});