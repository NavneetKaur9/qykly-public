'use strict';
/**
 * 
 */
angular.module('sbAdminApp').controller('regexCtrl', function($scope, $http, DTOptionsBuilder, DTColumnBuilder, api, $filter) {

	var url = 'http://localhost:3000/mod-api/';
	$scope.isCollapsed = true;
	api.get('msgtype-count', false, false, false, function(err, response) {
		if (err || response.error) {
			$scope.alerts = [{
				msg: response.userMessage || 'Server error! Are you connected to the internet?.',
				type: 'error'
			}];
		} else {
			$scope.msgtypes = response;
		}
	});

	//***** call data with angular-datatables

	$scope.dtOptions = DTOptionsBuilder.newOptions()
		.withOption('ajax', {
			url: url + 'get-regex',
			type: 'GET',
			// Either you specify the AjaxDataProp here
			dataSrc: function(tablesdata) {
				$scope.tablesdata = tablesdata;
				console.log(tablesdata);
			}
		})
		// or here
		.withDataProp('data')
		.withOption('processing', true)
		.withOption('serverSide', true)
		.withPaginationType('full_numbers');
	$scope.dtColumns = [
		DTColumnBuilder.newColumn('address').withTitle('address'),
		DTColumnBuilder.newColumn('msgType').withTitle('msgType '),
		DTColumnBuilder.newColumn('msgSubType').withTitle('msgSubType '),
		DTColumnBuilder.newColumn('pattern').withTitle('pattern '),
		DTColumnBuilder.newColumn('dateModified').withTitle('dateModified ').renderWith(function(data, type, full) {
			return $filter('date')(data, 'dd/MM/yyyy'); //date filter 

		})
	];


});