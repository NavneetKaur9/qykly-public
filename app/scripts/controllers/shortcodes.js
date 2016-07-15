'use strict';
/**
 *  Shortcodes controller
 */
angular.module('sbAdminApp').controller('shortcodesCtrl', function($scope, $http, api, $cookieStore, $window) {
	var url = api.addr();
	$window.scrollTo(0, 0);
	$scope.alert = '  loading.........';

	$scope.getShortcode = function(status) {

		$scope.alert = '  loading.........';

		api.get('get-codes', status, false, false, function(err, response) {
			if (err || response.error) {
				$scope.alert = response.userMessage || 'Server error! Are you connected to the internet?.';

			} else {
				if (status === '0') {
					$scope.unproc = response.unprocessed;
					$scope.new = response.newcode;
					$scope.getSms($scope.unproc[0], 0);
				} else {
					$scope.proc = response;
					// console.log('status:3', response);
				}
				$scope.alert = false;
			}
		});
	};

	$scope.getShortcode('0');
	$scope.getShortcode(3);
	$scope.getSms = function(code, status) {
		$scope.alert = 'fetching ' + code + ' messages....';
		api.get('get-smss/' + code + '/' + status, false, false, false, function(err, response) {
			if (err || response.error) {
				$scope.alert = response.userMessage || 'Server error! Are you connected to the internet?.';
			} else {
				$scope.code = code;
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
			if (err || response.error) {
				$scope.alerts = [{
					msg: response.userMessage || 'Server error! Are you connected to the internet?.',
					type: 'error'
				}];
			} else {

				$scope.alert = response.message;
				$scope.smses = [];
				$scope.getShortcode('0');
				$scope.getBlacklisteds();
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

	$scope.getBlacklisteds = function() {
		// 
		api.get('get-blacklisteds', false, false, false, function(err, response) {
			if (err || response.error) {
				$scope.alert = response.userMessage || 'Server error! Are you connected to the internet?.';
			} else {
				$scope.blacklisteds = response;
			}
		});
	};
	$scope.getBlacklisteds();

	$scope.searchCode = '';

	// $scope.shortcode = function() {
	// 	api.get('short-code', false, false, {
	// 		sender: $scope.searchCode
	// 	}, function(err, response) {
	// 		$scope.ShortcodeSummary = response;
	// 		console.log(response);
	// 	})
	// };
	$scope.currentPage = 1;
	$scope.pageSize = 10;
	$scope.sortType = 'saveTime';
	$scope.sortReverse = false;
	$scope.order = function(sortType) {
		$scope.sortReverse = ($scope.sortType === sortType) ? !$scope.sortReverse : false;
		$scope.sortType = sortType;
	};

});