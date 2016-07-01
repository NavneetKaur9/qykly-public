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
	$scope.selectAll = false;
	console.log('checking done');
	var titleHtml = '<input ng-model="selectAll" ng-click="toggleAll(selectAll)" type="checkbox">';

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

	api.get('get-sms-count-status', id, false, false, function(err, response) {
		if (err || response.error) {
			$scope.alerts = [{
				msg: response.userMessage || 'Server error! Are you connected to the internet?.',
				type: 'error'
			}];
		} else {
			$scope.statusCount = response;
		}
	});

	$scope.dtOptions = DTOptionsBuilder.newOptions()
		.withOption('ajax', {
			url: url + 'get-user-sms/' + id + '/0',
			type: 'GET',
			// data: function(data, dtinstance) {
			// 	data.columns[4].search.value = id;
			// }
		})
		// .withDataProp('data')
		.withOption('processing', true)
		.withOption('serverSide', true);

	$scope.dtColumns = [

		// DTColumnBuilder.newColumn('_id').withTitle(titleHtml).notSortable()
		// .renderWith(function(data, type, full, meta) {
		// 	// var
		// 	// vm.selected[full.id] = false;
		// 	return '<input type="checkbox" name="check" value="' + full.address + '" ng-click="toggle()">';

		// }),
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


	$scope.dtOptions1 = DTOptionsBuilder.newOptions()
		.withOption('ajax', {
			url: url + 'get-user-sms/' + id + '/3',
			type: 'GET',
			// data: function(data, dtinstance) {
			// 	data.columns[4].search.value = id;
			// }
		})
		// .withDataProp('data')
		.withOption('processing', true)
		.withOption('serverSide', true);

	$scope.dtColumns1 = [
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

	$scope.toggleAll = function(selectAll) {
		var checkboxes = document.getElementsByName('check');
		console.log(checkboxes);
		for (var i = 0; i < checkboxes.length; i++) {
			checkboxes[i].checked = !(checkboxes[i].checked);
		}
	};
	$scope.test = function() {

		var checkboxes = document.getElementsByName('check');
		for (var i = 0; i < checkboxes.length; i++) {
			console.log(checkboxes[i].checked);
			checkboxes[i].checked = !(checkboxes[i].checked);
		}
	};


});