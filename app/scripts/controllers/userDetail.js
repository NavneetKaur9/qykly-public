'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:
 * @description
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp').controller('userDetailCtrl', function($scope, $http, $stateParams, api, DTOptionsBuilder, DTColumnBuilder, $filter) {

	var id = $stateParams.id;
	var url = api.addr();

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
			type: 'GET',
			data: function(data, dtinstance) {
				// console.log(data);
			}
		})
		// .withDataProp('data')
		.withOption('processing', true)
		.withOption('serverSide', true);

	$scope.dtColumns = [
		DTColumnBuilder.newColumn('address').withTitle('address'),
		DTColumnBuilder.newColumn('text').withTitle('text '),
		DTColumnBuilder.newColumn('time').withTitle('time ').renderWith(function(data, type, full) {
			return $filter('date')(data, 'd MMM y, h:mm a');
		}),
		DTColumnBuilder.newColumn('status').withTitle('status ').renderWith(function(data, type, full) {
			if (data === 0) {
				return data = ' unprocessed';
			} else if (data === 3) {
				return data = ' processed';
			} else {
				return data;
			}
		})
	];

});