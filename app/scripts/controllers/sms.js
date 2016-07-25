'use strict';
/**
 * 
 */
angular.module('sbAdminApp').controller('smsCtrl', function($scope, $http, api, DTOptionsBuilder, DTColumnBuilder, $filter, $window, $cookieStore) {
	var url = api.addr();
	var token = $cookieStore.get('c2cCookie');
	$scope.dtOptions = DTOptionsBuilder.newOptions().withOption('ajax', {
		url: url + 'get-message',
		type: 'GET',
		headers: {
			Accept: "application/json",
			Authorization: $cookieStore.get('c2cCookie')
		},
		error: function(err) {
			$scope.alert = err.responseJSON.message; // body...
		},
		data: function(aodata) {
			if (aodata.draw == "1") {
				aodata.order[0].column = "6";
				aodata.order[0].dir = 'desc';
			}
		}
	}).withOption('processing', true).withDataProp('data').withOption('serverSide', true).withLanguage({
		'sSearch': 'Search Shortcode/message:',
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
		DTColumnBuilder.newColumn('address').withTitle('Address'),
		DTColumnBuilder.newColumn('text').withTitle('smsText'),
		DTColumnBuilder.newColumn('status').withTitle('Status ').renderWith(function(data, type, full) {
			if (data == 0) {
				return "unprocessed";
			} else if (data == 3) {
				return "processed";
			} else if (data == 1) {
				return "blacklisted";
			} else if (data == 5) {
				return "Assigned";
			} else {
				return data;
			}
		}).withOption('searchable', false),
		DTColumnBuilder.newColumn('time').withTitle('time ').renderWith(function(data, type, full) {
			return $filter('date')(data, 'd MMM y, h:mm a'); //date filter 
		}).withOption('searchable', false),
		DTColumnBuilder.newColumn('saveTime').withTitle('saveTime ').renderWith(function(data, type, full) {
			return $filter('date')(data, 'd MMM y, h:mm a'); //date filter 
		}).withOption('searchable', false)
	];
	api.get('summary', false, token, false, function(err, response) {
		if (err || response.error) {
			$scope.alerts = [{
				msg: response.userMessage || 'Server error! Are you connected to the internet?.',
				type: 'error'
			}];
		} else {
			$scope.summary = response;
		}
	});
	api.get('regex-summary', false, token, false, function(err, response) {
		if (err || response.error) {
			$scope.alerts = [{
				msg: response.userMessage || 'Server error! Are you connected to the internet?.',
				type: 'error'
			}];
		} else {
			$scope.regexSummary = response;
		}
	});
});