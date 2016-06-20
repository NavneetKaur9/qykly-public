'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:loginCtrl
 * @description
 * # loginCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
	.controller('loginCtrl', function($scope, $position, $location, $http, $cookieStore) {
		$scope.errors = false;
		$scope.user = true;
		$scope.login = function() {



			$http.post('api/modlogin', {
				email: $scope.email,
				password: $scope.password
			}).then(function(response) {

				if (response) {

					$scope.user = response.data.error;
					$scope.success = true;
					$scope.successMessage = response.data.userMessage || 'Success.';

					if (response.data.data) {


						$cookieStore.put('c2cCookie', response.data.data);

						$location.path('/dashboard/home');

						// window.location.reload();
					}

				}


			}, function(response) {
				$scope.errors = true;
				$scope.success = false;
				$scope.errorMessage = response.data.data.userMessage || 'Server error.';
			});

		};
	});