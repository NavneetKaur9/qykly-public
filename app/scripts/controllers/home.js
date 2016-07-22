'use strict';
/**
 * 
 */
angular.module('sbAdminApp').controller('homeCtrl', function($scope, $http, api, $sce, $window) {
	$scope.yes = function() {
		console.log('yes');
		$scope.show = true;
	}

	// $scope.sortType = 'saveTime';
	// $scope.sortReverse = false;
	// $scope.order = function(sortType) {
	// 	$scope.sortReverse = ($scope.sortType === sortType) ? !$scope.sortReverse : false;
	// 	$scope.sortType = sortType;
	// };
});