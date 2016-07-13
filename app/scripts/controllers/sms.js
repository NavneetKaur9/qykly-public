'use strict';
/**
 * 
 */
angular.module('sbAdminApp').controller('smsCtrl', function($scope, $http, api, DTOptionsBuilder, DTColumnBuilder, $filter, $window) {
	var url = api.addr();
	$scope.dtOptions = DTOptionsBuilder.newOptions().withOption('ajax', {
			url: url + 'get-message',
			type: 'GET'
		})
		.withOption('processing', true)
		.withDataProp('data')
		.withOption('serverSide', true)
		.withLanguage({
			'sSearch': 'Search Shortcode/message:',
			'oPaginate': {
				'sNext': '»',
				'sPrevious': '«'
			}
		})
		.withOption('headerCallback', function(header) {
			$window.scrollTo(0, 0);

		});

	$scope.dtColumns = [
		DTColumnBuilder.newColumn('_id').notVisible().withOption('searchable', false),
		DTColumnBuilder.newColumn('address').withTitle('Address'),
		DTColumnBuilder.newColumn('text').withTitle('smsText'),
		DTColumnBuilder.newColumn('status').withTitle('Status '),
		DTColumnBuilder.newColumn('time').withTitle('time ').renderWith(function(data, type, full) {
			return $filter('date')(data, 'd MMM y, h:mm a'); //date filter 
		}).withOption('searchable', false), ,
		DTColumnBuilder.newColumn('saveTime').withTitle('saveTime ').renderWith(function(data, type, full) {
			return $filter('date')(data, 'd MMM y, h:mm a'); //date filter 
		}).withOption('searchable', false)
	];

	api.get('summary', false, false, false, function(err, response) {
		if (err || response.error) {
			$scope.alerts = [{
				msg: response.userMessage || 'Server error! Are you connected to the internet?.',
				type: 'error'
			}];
		} else {
			$scope.summary = response;
		}
	});
	api.get('regex-summary', false, false, false, function(err, response) {
		if (err || response.error) {
			$scope.alerts = [{
				msg: response.userMessage || 'Server error! Are you connected to the internet?.',
				type: 'error'
			}];
		} else {
			$scope.regexSummary = response;
		}
	});
	$scope.assignMessage = function() {
		api.post('assign-message', false, {
			// modusers: 78687,
			// messages: [{}, {}, ]
		}, function(err, response) {
			if (err || response.error) {
				$scope.alerts = [{
					msg: response.userMessage || 'Server error! Are you connected to the internet?.',
					type: 'error'
				}];
			} else {
				// response ok
			}
		});
	};
	$scope.movetoDump = function() {
		api.put('move-to-dumb', false, false, {
			// array of msg id
		}, function(err, response) {});
	};
});