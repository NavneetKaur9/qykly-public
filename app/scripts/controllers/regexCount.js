'use strict';
/**
 * 
 */
angular.module('sbAdminApp').controller('regexCountCtrl', function($scope, $http, api, $sce, $window, $cookieStore) {
	$scope.alert = "  Loading Data will take some time.....";

	api.get('regex-analytics', false, false, false, function(err, response) {
		if (err) {
			$scope.alert = response.message;
		} else {
			$scope.alert = false;
			$scope.dataset = response;
		}
	});

	// $scope.sortType = 'saveTime';
	// $scope.sortReverse = false;
	// $scope.order = function(sortType) {
	// 	$scope.sortReverse = ($scope.sortType === sortType) ? !$scope.sortReverse : false;
	// 	$scope.sortType = sortType;
	// };
});