'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('sbAdminApp')
	.directive('header', function() {
		return {
			templateUrl: 'scripts/directives/header/header.html',
			restrict: 'E',
			replace: true,
			controller: function($scope, api) {
				api.get('userprofile', false, false, false, function(err, response) {
					if (err) {
						$scope.alert = response.message
					} else {
						$scope.user = response.user;
						$scope.msgAssigned = response.result;
					}
				});

			}
		}
	});