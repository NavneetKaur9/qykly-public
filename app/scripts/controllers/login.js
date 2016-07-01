'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:loginCtrl
 * @description
 * # loginCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
	.controller('loginCtrl', function($scope, $location, $http, $cookieStore, api) {

		$scope.login = function() {

			api.post('login', false, {
				username: $scope.username,
				password: $scope.password
			}, function(err, response) {
				$scope.success = true;
				$scope.message = response.message;

				if (response.data) {
					$location.path('/dashboard/home');
					$cookieStore.put('c2cCookie', response.data.token);
				}
			});


		};
	});