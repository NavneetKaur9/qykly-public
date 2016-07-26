'use strict';
/**
 * 
 */
angular.module('sbAdminApp').controller('homeCtrl', function($scope, $http, api, $sce, $window, $cookieStore) {
	$scope.yes = function() {
		console.log('yes');
		$scope.show = true;
	};
	// api.get('temporary', false, false, false, function(err, response) {
	// 	if (err) {
	// 		$scope.alert = response.message;
	// 	} else {
	// 		// $scope.alert = response.message;
	// 		$scope.dataset = response;
	// 	}
	// });

	// $scope.sortType = 'saveTime';
	// $scope.sortReverse = false;
	// $scope.order = function(sortType) {
	// 	$scope.sortReverse = ($scope.sortType === sortType) ? !$scope.sortReverse : false;
	// 	$scope.sortType = sortType;
	// };
});