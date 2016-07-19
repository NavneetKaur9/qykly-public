'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:loginCtrl
 * @description
 * # loginCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
	.controller('loginCtrl', function($scope, $location, $http, $cookieStore, api, $cookies, $window) {

		$cookieStore.remove('c2cCookie');
		console.log($cookieStore.get('c2cCookie'));

		$scope.login = function() {

			api.post('login', false, {
				username: $scope.username,
				password: $scope.password
			}, function(err, response) {
				$scope.success = true;
				$scope.message = response.message;
				if (response.data) {
					$location.path('/dashboard/home');
					$cookieStore.put('c2cCookie', response.data.authToken);
					console.log('logged in', $cookieStore.get('c2cCookie'));

				}
			});

		};
	});