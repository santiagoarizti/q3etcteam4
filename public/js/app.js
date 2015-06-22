var app = angular.module('mainApp', ['ngSanitize','ngDialog','ngRoute']);

app.config(function ($routeProvider){
	$routeProvider.when('/email', {
		templateUrl: 'views/email.html',
		controller: 'emailCtrl',
		isViewEnabled: true,
		isAuthenticationNeeded: false
	}).when('/sms', {
		templateUrl: 'views/sms.html',
		controller: 'smsCtrl',
		isViewEnabled: true,
		isAuthenticationNeeded: false
	}).when('/im', {
		templateUrl: 'views/im.html',
		controller: 'imCtrl',
		isViewEnabled: true,
		isAuthenticacionNeeded: false
	}).otherwise({
		redirectTo: '/email'
	});
});

app.controller('mainCtrl', function($scope, $location){
	
	$scope.activeTab = 'email'; // email, sms, im
	try {$scope.activeTab=$location.$$path.split("/")[1];}catch(any){}
	
});

app.controller('emailCtrl', function($scope, $sanitize, $http, ngDialog){
	
	$scope.subject = '';
	$scope.to = '';
	$scope.html = 'some <strong>H</strong>TML';
	
	$scope.sending = false;
	
	$scope.sanitizedHtml = function(){
		try {
			return $sanitize($scope.html);
		} catch (error) {
			return '';
		}
		return '';
	};
	
	$scope.sendEmail = function () {
		$scope.sending = true;
		$http.post('/api/sendEmail', {
			subject: $scope.subject,
			to: $scope.to,
			html: $scope.sanitizedHtml()
		}).
		success(function(data, status, headers, config) {
			$scope.clearForm();
			$scope.sending = false;
			
			ngDialog.open({
				template: 'views/templates/secondDialog.html',
				className: 'ngdialog-theme-default ngdialog-theme-custom'				
			});
		}).error(function(){
			$scope.sending = false;			
		});
	};
	
	$scope.openDialog = function(){
		ngDialog.open({
			templateUrl: 'views/templates/firstDialog.html',
			scope: $scope,
			className: 'ngdialog-theme-default ngdialog-theme-custom'
		});
	};
	
	$scope.clearForm = function(){
		$scope.subject = '';
		$scope.to = '';
		$scope.html = '';
		$scope.sending = false;
		
		$scope.emailForm.$setPristine();
	};
});

app.controller('smsCtrl', function($scope){
	
});

app.controller('imCtrl', function($scope){
	
});