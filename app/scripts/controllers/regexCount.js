'use strict';
/**
 * 
 */
angular.module('sbAdminApp').controller('regexCountCtrl', function($scope, $http, api, $sce, $window, $cookieStore) {
	$scope.alert = "  Loading Data will take some time.....";

	// api.get('regex-analytics', false, false, false, function(err, response) {
	// 	if (err) {
	// 		$scope.alert = response.message;
	// 	} else {
	// 		$scope.alert = false;
	// 		$scope.dataset = response;
	// 	}
	// });


	$scope.closeAlert = function(argument) {
		$scope.alert = false;
	};
	
	// $scope.sortType = 'saveTime';
	// $scope.sortReverse = false;
	// $scope.order = function(sortType) {
	// 	$scope.sortReverse = ($scope.sortType === sortType) ? !$scope.sortReverse : false;
	// 	$scope.sortType = sortType;
	// };

	// app.route('/api2/get-msgtype')
		// .get(regexes.getMsgType);
	api.get('get-msgtype', false, false, false, function(err, response) {
		if (err) {
			$scope.alert = response.message;
		} else {
			$scope.alert = false;
			$scope.msgtypes = response;
		}
	});
	// app.route('/api2/get-merchantName')
		// .get(regexes.getMerchantOrBankName);
	api.get('get-merchantName', false, false, false, function(err, response) {
		if (err) {
			$scope.alert = response.message;
		} else {
			$scope.alert = false;
			$scope.merchants = response;
		}
	});
});