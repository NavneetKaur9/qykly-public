'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:loginCtrl
 * @description
 * # loginCtrl
 * Controller of the sbAdminApp
 */ 
angular.module('sbAdminApp').controller('loginCtrl', function($scope, $location, $http, $cookieStore, api) {
	
	$scope.login = function() {
		if (!$scope.username) {
			$scope.message = "please enter username";
			return
		} else if (!$scope.password) {
			$scope.message = "please enter password";
			return
		}
		api.post('login', false, false, {
			username: $scope.username,
			password: $scope.password
		}, function(err, response) {
			$scope.success = true;
			$scope.message = response.message;
			if (response.data) {
				$location.path('/dashboard/users');
				$cookieStore.put('c2cCookie', response.data.authToken);
			}
		});
	};
});