var app = angular.module('mainApp', ['ngSanitize','ngDialog']);

app.controller('mainCtrl', function($scope, $http, $sanitize, ngDialog){
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
				template: 'secondDialog',
				className: 'ngdialog-theme-default ngdialog-theme-custom'				
			});
		}).error(function(){
			$scope.sending = false;			
		});
	};
	
	$scope.openDialog = function(){
		ngDialog.open({
			template: 'firstDialog',
			scope: $scope,
			className: 'ngdialog-theme-default ngdialog-theme-custom'
		});
	};
	
	$scope.clearForm = function(){
		$scope.subject = '';
		$scope.to = '';
		$scope.html = '';
		$scope.sending = false;
	};
});