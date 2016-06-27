'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:
 * @description
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp').controller('userDetailCtrl', function($scope, $http, $stateParams, api, DTOptionsBuilder, DTColumnBuilder, $filter) {

	// console.log($stateParams);
	var id = $stateParams.id;
	var url = 'http://localhost:3000/mod-api/';


	api.get('get-user', id, false, false, function(err, response) {
		if (err || response.error) {
			$scope.alerts = [{
				msg: response.userMessage || 'Server error! Are you connected to the internet?.',
				type: 'error'
			}];
		} else {
			$scope.userData = response;
		}
	});


	$scope.dtOptions = DTOptionsBuilder.newOptions()
		.withOption('ajax', {
			url: url + 'get-user-sms/' + id,
			type: 'GET'
				// Either you specify the AjaxDataProp here
				// dataSrc: function(tablesdata) {
				// 	$scope.tablesdata = tablesdata.length;
				// 	console.log(tablesdata);
				// }
		})
		// or here
		// .withDataProp('data')
		.withOption('processing', true)
		.withOption('serverSide', true);

	$scope.dtColumns = [
		DTColumnBuilder.newColumn('address').withTitle('address'),
		DTColumnBuilder.newColumn('text').withTitle('text '),
		DTColumnBuilder.newColumn('time').withTitle('time ').renderWith(function(data, type, full) {
			return $filter('date')(data, 'dd/MM/yyyy'); //date filter 

		}),
		DTColumnBuilder.newColumn('status').withTitle('status ')

	];

});