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
			if (err || response.error) {
				$scope.alerts = [{
					msg: response.userMessage || 'Server error! Are you connected to the internet?.',
					type: 'error'
				}];
			} else {
				$scope.userData = response.userdata;
			}
		});
	};
	$scope.getUser();
	$scope.getShortcode = function() {
		$scope.alert = '  loading.........';
		api.get('get-shortcode', id, false, false, function(err, response) {
			if (err || response.error) {
				$scope.alerts = [{
					msg: response.userMessage || 'Server error! Are you connected to the internet?.',
					type: 'error'
				}];
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
			if (err || response.error) {
				$scope.alerts = [{
					msg: response.userMessage || 'Server error! Are you connected to the internet?.',
					type: 'error'
				}];
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
		$scope.code = code;
		api.get('get-sms/' + id + '/' + status + '/' + code, false, false, false, function(err, response) {
			if (err || response.error) {
				$scope.alerts = [{
					msg: response.userMessage || 'Server error! Are you connected to the internet?.',
					type: 'error'
				}];
			} else {
				$scope.smses = response;
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
			if (err || response.error) {
				$scope.alerts = [{
					msg: response.userMessage || 'Server error! Are you connected to the internet?.',
					type: 'error'
				}];
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


	//----------------------------------------------------------------------------------------------------------------------------------------------------------------
	// $scope.pagination = Pagination.getNew(10);
	// $scope.pagination.numPages = Math.ceil($scope.unproc.length / $scope.pagination.perPage);

	// $scope.currentPage = 1;
	// $scope.pageSize = 10;

	// $scope.selectAll = false;
	// var titleHtml = '<input ng-model="selectAll" ng-click="toggleAll(selectAll)" type="checkbox">';

	// $scope.toggle = function() {
	// 	var checkboxes = document.getElementsByName('blacklist');
	// 	for (var i = 0; i < checkboxes.length; i++) {
	// 		checkboxes[i].checked = $scope.toggleSelection;
	// 	}
	// };

});