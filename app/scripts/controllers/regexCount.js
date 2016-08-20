'use strict';
/**
 * 
 */
angular.module('sbAdminApp').controller('regexCountCtrl', function($scope, $http, api, $sce, $window, $cookieStore) {
	$scope.alert = "  Loading Data will take some time.....";
  $scope.getRegexAnalytics=function () {

	  api.get('regex-analytics', false, false, false, function(err, response) {
		  if (err) {
			  $scope.alert = response.message;
		  } else {
			  $scope.alert = false;
			  $scope.dataset = response;
		  }
	  });
  };
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
	$scope.getCount=function (key) {
		$scope.merchantLoader = true;
		$scope.msgTypeData=[];
		$scope.data=[];
			api.get('get-count', false, false, {
				key:key,
				value:$scope.q
			}, function(err, response) {
				if (err) {
					$scope.alert = response.message;
				} else {
					$scope.merchantLoader = false;
					if(key==='msgType'){
						$scope.msgTypeData=response;
					}else{
						$scope.data=response;

					}
				}
			});
	};
	$scope.sortType = 'count';
	$scope.sortReverse = false;
	$scope.order = function(sortType) {
		$scope.sortReverse = ($scope.sortType === sortType) ? !$scope.sortReverse : false;
		$scope.sortType = sortType;
	};

});