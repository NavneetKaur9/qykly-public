'use strict';
/**
 * 
 */
angular.module('sbAdminApp').controller('notificationCtrl', function($scope, $http, api, $sce, $window) {

	api.get('userprofile', false, false, false, function(err, response) {
		if (err) {
			$scope.alert = response.message
		} else {
			$scope.user = response.user;
			$scope.msgAssigned = response.result;
		}
	});
	$scope.sortType = 'saveTime';
	$scope.sortReverse = false;
	$scope.order = function(sortType) {
		$scope.sortReverse = ($scope.sortType === sortType) ? !$scope.sortReverse : false;
		$scope.sortType = sortType;
	};
});