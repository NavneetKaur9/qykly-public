'use strict';
/**
 * 
 */
angular.module('sbAdminApp').controller('smsCtrl', function($scope, $http, api, DTOptionsBuilder, DTColumnBuilder, $filter) {

	var url = 'http://localhost:3000/mod-api/';
	$scope.dtOptions = DTOptionsBuilder.newOptions().withOption('ajax', {
			url: url + 'get-message',
			type: 'GET'
		})
		.withOption('processing', true).withOption('serverSide', true).withPaginationType('full_numbers');
	$scope.dtColumns = [
		DTColumnBuilder.newColumn('address').withTitle('Address'),
		DTColumnBuilder.newColumn('text').withTitle('smsText'),
		DTColumnBuilder.newColumn('status').withTitle('Status '),
		DTColumnBuilder.newColumn('time').withTitle('time ').renderWith(function(data, type, full) {
			return $filter('date')(data, 'dd/MM/yyyy'); //date filter 
		}),
		DTColumnBuilder.newColumn('saveTime').withTitle('saveTime ').renderWith(function(data, type, full) {
			return $filter('date')(data, 'dd/MM/yyyy'); //date filter 
		})
	]

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
		}, function(err, response) {


		});
	};



});