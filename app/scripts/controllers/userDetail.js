'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:
 * @description
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp').controller('userDetailCtrl', function($scope, $http, $stateParams, api, DTOptionsBuilder, DTColumnBuilder, $filter, $window) {
	var id = $stateParams.id;
	var url = api.addr();
	$window.scrollTo(0, 0);
	$scope.getUser = function() {
		// body...
		api.get('get-user', id, false, false, function(err, response) {
			if (err) {
				$scope.alert = response.message;
			} else {
				$scope.userData = response.userdata;
			}
		});
	};
	$scope.getUser();
	$scope.getShortcode = function() {
		$scope.alert = '  loading.........';
		api.get('get-shortcode', id, false, false, function(err, response) {
			if (err) {
				$scope.alert = response.message;
			} else {
				$scope.new = response.new;
				$scope.proc = response.processed;
				$scope.unproc = response.unprocessed;
				$scope.alert = false;
			}
		});
	};
	$scope.getShortcode();
	$scope.countStatus = function() {
		api.get('get-sms-count-status', id, false, false, function(err, response) {
			if (err) {
				$scope.alert = response.message;
			} else {
				// $scope.statusCount = response;
				for (var i = 0; i < response.length; i++) {
					if (response[i].status === 0) {
						$scope.unproCount = response[i].count;
					} else if (response[i].status === 3) {
						$scope.proCount = response[i].count;
					}
				}
			}
		});
	};
	$scope.countStatus();
	$scope.getSms = function(code, status) {
		$scope.alert = 'fetching ' + code + ' messages....';
		$scope.code = code;
		api.get('get-sms/' + id + '/' + status + '/' + code, false, false, false, function(err, response) {
			if (err) {
				$scope.alert = response.message;
			} else {
				$scope.smses = response;
				$scope.alert = false;
			}
		});
	};
	$scope.blacklist = function() {
		$scope.addresses = [];
		var checkboxes = document.getElementsByName('blacklist');
		for (var i = 0; i < checkboxes.length; i++) {
			if (checkboxes[i].checked) {
				var value = checkboxes[i].value;
				$scope.addresses.push(value);
			}
		}
		api.put('blacklist', false, false, {
			address: $scope.addresses
		}, function(err, response) {
			if (err) {
				$scope.alert = response.message;
			} else {
				$scope.alert = response.message;
				$scope.smses = [];
				$scope.getShortcode();
				$scope.countStatus();
			}
		});
	};
	$scope.reset = function(argument) {
		$scope.smses = [];
		$scope.code = "";
	};
	$scope.closeAlert = function(argument) {
		$scope.alert = false;
	};
	$scope.sortType = 'saveTime';
	$scope.sortReverse = false;
	$scope.order = function(sortType) {
		$scope.sortReverse = ($scope.sortType === sortType) ? !$scope.sortReverse : false;
		$scope.sortType = sortType;
	};
	$scope.parseAllSms = function() {
		$scope.alert = '  processing.........';
		api.post('parsesms', false, {
			deviceId: id
		}, function(err, response) {
			if (err) {
				$scope.alert = response.message;
			} else if (response.output.length === 0) {
				return $scope.alert = "No data found";
			}
			$scope.parseSmsResult = response;
			$scope.alert = false;
		});
	};
	$scope.parseSms = function(code) {
		$scope.parseSmsResult = [];
		$scope.alert = 'processing.........';
		api.post('parsesmsbyshortcode', false, {
			shortcode: code
		}, function(err, response) {
			if (err) {
				$scope.alert = response.message;
			} else if (response.output.length === 0) {
				$scope.alert = "No data found";
			}
			$scope.parseSmsResult = response;
			$scope.alert = false;
		});
	};
	$scope.closeParseSmsResult = function(argument) {
		$scope.parseSmsResult = [];
	};
});