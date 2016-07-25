'use strict';
/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('sbAdminApp').directive('header', function() {
	return {
		templateUrl: 'scripts/directives/header/header.html',
		restrict: 'E',
		replace: true,
		controller: function($scope, api, $cookieStore) {
			var token = $cookieStore.get('c2cCookie');
			api.get('userprofile', false, token, false, function(err, response) {
				if (err) {
					$scope.alert = response.message
				} else {
					$scope.user = response.user;
					console.log(response.result);
					$scope.msgAssigned = response.result.toString();
				}
			});
		}
	}
});