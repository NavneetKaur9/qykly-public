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
	
	
	api.get('get-msgtype', false, false, false, function(err, response) {
		if (err) {
			$scope.alert = response.message;
		} else {
			$scope.alert = false;
			$scope.msgtypes = response;
		}
	});
	api.get('get-merchantName', false, false, false, function(err, response) {
		if (err) {
			$scope.alert = response.message;
		} else {
			$scope.alert = false;
			$scope.merchants = response[1];
			$scope.banks = response[0];

		}
	});
	$scope.getData=function (value) {
		console.log(value);
	// http://localhost:3000/api2/get-data-of-merchant?bankName=ICICI
	};

});