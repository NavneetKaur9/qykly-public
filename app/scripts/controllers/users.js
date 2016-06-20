'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:
 * @description
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
	.controller('usersCtrl', function($scope, $position, $location, $http) {


		$http.get('api/userdetails').then(function(response) {
			$scope.userdetails = response.data.data;
		}, function(response) {
			$scope.alerts = [{
				msg: response.data.userMessage || 'Server error! Are you connected to the internet?.',
				type: 'error'
			}];
		});

		$scope.sortType = 'LaunchDate';
		$scope.sortReverse = true;
		$scope.order = function(sortType) {
			$scope.sortReverse = ($scope.sortType === sortType) ? !$scope.sortReverse : false;
			$scope.sortType = sortType;
		};


	});