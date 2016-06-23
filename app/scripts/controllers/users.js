'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:
 * @description
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
	.controller('usersCtrl', function($scope, $location, $http, api, DTOptionsBuilder, DTColumnBuilder, $filter, $compile) {


		var url = 'http://localhost:3000/mod-api/';
		// var vm = this;
// vm.selected = {};
// vm.selectAll = false;
// vm.toggleAll = toggleAll;
// vm.toggleOne = toggleOne;

// var titleHtml = '<input ng-model="vm.selectAll" ng-click="vm.toggleAll(vm.selectAll, vm.selected)" type="checkbox">';


		$scope.dtOptions = DTOptionsBuilder.newOptions()
			.withOption('ajax', {
				url: url + 'get-user',
				type: 'GET'
					// Either you specify the AjaxDataProp here
					// dataSrc: function(dataset) {
					// 	$scope.dataset = dataset;
					// 	console.log(dataset.length);
					// }

			})
			// .withDataProp('data')
			.withOption('processing', true)
			.withOption('serverSide', true);

		// .withPaginationType('full_numbers');

		$scope.dtColumns = [

			DTColumnBuilder.newColumn('primaryEmail').withTitle('Email '),
			// DTColumnBuilder.newColumn('msgType').withTitle('msgType '),
			DTColumnBuilder.newColumn('registerTime').withTitle('registerTime'),
			DTColumnBuilder.newColumn('dateCreated').withTitle('dateCreated ').renderWith(function(data, type, full) {
				return $filter('date')(data, 'dd/MM/yyyy'); //date filter 
			}),
			DTColumnBuilder.newColumn('dateModified').withTitle('dateModified ').renderWith(function(data, type, full) {
				return $filter('date')(data, 'dd/MM/yyyy'); //date filter 
			})
		];



	});