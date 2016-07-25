'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:loginCtrl
 * @description
 * # loginCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
	.controller('loginCtrl', function($scope, $location, $http, $cookieStore, $cookies, $window) {

		$cookieStore.remove('c2cCookie');
		console.log('before login', $cookieStore.get('c2cCookie'));

		$scope.login = function() {

			if (!$scope.username) {
				$scope.message = "please enter username";
				return
			} else if (!$scope.password) {
				$scope.message = "please enter password";
				return
			}

			// var parseUrl = 'http://localhost:3000/api2';
			// var parseUrl = 'http://52.66.81.240/api2'; // staging server address
			var parseUrl = 'http://54.169.236.107/api2'; //  production server address

			$http({
				method: 'POST',
				url: parseUrl + '/login',
				data: {
					username: $scope.username,
					password: $scope.password
				}
			}).then(function successCallback(response) {
				console.log(response.data, 'success');


				$scope.success = true;
				$scope.message = response.data.message;
				if (response.data.data) {
					$cookieStore.put('c2cCookie', response.data.data.authToken);
					$location.path('/dashboard/users');
					console.log('after login', $cookieStore.get('c2cCookie'));

				}
			}, function errorCallback(response) {
				console.log('error', response);
				$scope.message = response.message;
			});

			// api.post('login', false, {
			// 	username: $scope.username,
			// 	password: $scope.password
			// }, function(err, response) {
			// 	$scope.success = true;
			// 	$scope.message = response.message;
			// 	if (response.data) {
			// 		$location.path('/dashboard/users');
			// 		$cookieStore.put('c2cCookie', response.data.authToken);
			// 		console.log('logged in', $cookieStore.get('c2cCookie'));

			// 	}
			// });

		};
	});