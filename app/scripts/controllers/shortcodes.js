'use strict';
/**
 *  Shortcodes controller
 */
angular.module('sbAdminApp').controller('shortcodesCtrl', function($scope, $http, api, $cookieStore, $window, DTOptionsBuilder, DTColumnBuilder, $filter) {
	var url = api.addr();
	var token = $cookieStore.get('c2cCookie');
	$window.scrollTo(0, 0);
	$scope.alert = '  loading.........';
	$scope.getShortcode = function(status) {
		console.log('status',status);
		$scope.alert = '  loading.........';
		api.get('get-codes', status, token, false, function(err, response) {
			if (err || response.error) {
				$scope.alert = response.userMessage || 'Server error! Are you connected to the internet?.';
			} else {
				if (status === '0') {
					$scope.unproc = response.unprocessed;
					$scope.new = response.newcode;
					$scope.getShortcode(3);
				}else if(status === 5){
					console.log('response',response);
					$scope.reset();
					$scope.assignedShortcodes=response;
					$scope.getSms($scope.assignedShortcodes[0], 5);
				} 
				else {
					$scope.proc = response;
					$scope.getSms($scope.unproc[0], 0);
					// $scope.alert = false;
				}
			}
		});
	};
	$scope.getShortcode('0');
	$scope.getSms = function(code, status) {
		$scope.alert = 'fetching ' + code + ' messages....';
		api.get('get-smss/' + code + '/' + status, false, token, false, function(err, response) {
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
		api.put('blacklist', false, token, {
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
				// $scope.getBlacklisteds();
			}
		});
	};
	$scope.reset = function() {
		$scope.smses = [];
		$scope.code = "";
	};
	$scope.closeAlert = function() {
		$scope.alert = false;
	};
	$scope.searchCode = '';
	$scope.searchShortcode = function() {
		api.get('Search-code', false, token, {
			address: $scope.searchCode
		}, function(err, response) {
			$scope.alert = response.message;
			$scope.searchResult = response.result;
		})
	};
	$scope.currentPage = 1;
	$scope.pageSize = 10;
	$scope.sortType = 'saveTime';
	$scope.sortReverse = false;
	$scope.order = function(sortType) {
		$scope.sortReverse = ($scope.sortType === sortType) ? !$scope.sortReverse : false;
		$scope.sortType = sortType;
	};
	$scope.dtOptions = DTOptionsBuilder.newOptions().withOption('ajax', {
		url: url + 'get-blacklisteds',
		type: 'GET',
		data: function(aodata) {
			if (aodata.draw == "1") {
				aodata.order[0].column = "4";
				aodata.order[0].dir = 'desc';
			}
		}
	}).withDataProp('data').withOption('processing', true).withOption('serverSide', true).withLanguage({
		'sSearch': 'Search  Blacklisted Shortcode:',
		'oPaginate': {
			'sNext': '»',
			'sPrevious': '«'
		}
	}).withOption('headerCallback', function(header) {
		$window.scrollTo(0, 0);
	});
	$scope.dtColumns = [
		DTColumnBuilder.newColumn('_id').notVisible().withOption('searchable', false),
		DTColumnBuilder.newColumn(null).withTitle('# ').renderWith(function(data, type, full, meta) {
			return data = meta.settings._iDisplayStart + meta.row + 1;
		}).notSortable().withOption('searchable', false).withOption('width', '2%'),
		DTColumnBuilder.newColumn('Sender').withTitle('Sender '),
		DTColumnBuilder.newColumn('Status').withTitle('Status ').withOption('searchable', false),
		DTColumnBuilder.newColumn('saveTime').withTitle('DateModified      ').renderWith(function(data, type, full) {
			return $filter('date')(data, 'd/MM/yy,h:mma'); //date filter 
		}).withOption('searchable', false).withOption('width', '20%')
	];
	$scope.parseSms = function(code) {
		// $scope.alert = false;
		$scope.parseSmsResult = [];
		$scope.alert = 'processing.........';
		api.post('parsesmsbyshortcode', false, token, {
			shortcode: code
		}, function(err, response) {
			$scope.parseSmsResult = response;
			$scope.alert = false;
			$scope.getShortcode('0');
		});
	};
	$scope.closeParseSmsResult = function() {
		$scope.parseSmsResult = [];
	};
	$scope.assign = function() {
		$scope.msgText = [];
		var checkboxes = document.getElementsByName('assign');
		for (var i = 0; i < checkboxes.length; i++) {
			if (checkboxes[i].checked) {
				var value = checkboxes[i].value;
				$scope.msgText.push(value);
			}
		}
		console.log($scope.msgText);
		api.put('assign-msg', false, token, {
			msgText: $scope.msgText,
			assignTo: $scope.assignTo.name
		}, function(err, response) {
			if (err || response.error) {
				$scope.alert = response.message;
			} else {
				$scope.alert = response.message;
				$scope.getSms($scope.code, 0);
			}
		});
	};
	// get mod users
	api.get('user', false, token, false, function(err, response) {
		if (err) {
			$scope.alert = response.message;
		} else {
			$scope.modusers = response;
		}
	});


	$scope.moveToDump = function() {
		$scope.msgText = [];
		var checkboxes = document.getElementsByName('assign');
		for (var i = 0; i < checkboxes.length; i++) {
			if (checkboxes[i].checked) {
				var value = checkboxes[i].value;
				$scope.msgText.push(value);
			}
		}
		console.log($scope.msgText);
		api.put('move-to-dumb', false, token, {
			msgText: $scope.msgText
		}, function(err, response) {
			if (err || response.error) {
				$scope.alert = response.message;
			} else {
				$scope.alert = response.message;
				$scope.getSms($scope.code, 0);
			}
		});

	};
	$scope.laterUse=function () {
		$scope.addresses = [];
		var checkboxes = document.getElementsByName('blacklist');
		for (var i = 0; i < checkboxes.length; i++) {
			if (checkboxes[i].checked) {
				var value = checkboxes[i].value;
				$scope.addresses.push(value);
			}
		}
		api.put('later-use', false, token, {
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
				// $scope.getBlacklisteds();
			}
		});
	};
});