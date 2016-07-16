'use strict';
/**
 * 
 */
angular.module('sbAdminApp').controller('regexCtrl', function($scope, $http, DTOptionsBuilder, DTColumnBuilder, api, $filter, $window) {

	var url = api.addr();
	$window.scrollTo(0, 0);
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
			data: function(aodata) {

				if (aodata.draw == "1") {
					aodata.order[0].column = "6";
					aodata.order[0].dir = 'desc';
				}
			}
		})
		.withDataProp('data')
		.withOption('processing', true)
		.withOption('serverSide', true);



	$scope.dtColumns = [
		DTColumnBuilder.newColumn('_id').notVisible().withOption('searchable', false),
		DTColumnBuilder.newColumn(null).withTitle('# ').renderWith(function(data, type, full, meta) {
			return data = meta.settings._iDisplayStart + meta.row + 1;
		}).notSortable().withOption('searchable', false).withOption('width', '2%'),
		DTColumnBuilder.newColumn('address').withTitle('address'),
		DTColumnBuilder.newColumn('msgType').withTitle('msgType '),
		DTColumnBuilder.newColumn('msgSubType').withTitle('msgSubType '),
		DTColumnBuilder.newColumn('pattern').withTitle('pattern ').withOption('searchable', false),
		DTColumnBuilder.newColumn('dateModified').withTitle('dateModified ').renderWith(function(data, type, full) {
			return $filter('date')(data, 'd MMM y, h:mm a'); //date filter 

		}).withOption('searchable', false)

	];


});