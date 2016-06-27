'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:
 * @description
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
	.controller('usersCtrl', function($scope, $location, $http, api, DTOptionsBuilder, DTColumnBuilder, $filter, $compile, $state) {


		var url = 'http://localhost:3000/mod-api/';
		var vm = this;
		$scope.message = '';
		$scope.dtOptions = DTOptionsBuilder.newOptions()
			.withOption('ajax', {
				url: url + 'get-user',
				type: 'GET'
			})
			.withDataProp('data')
			.withOption('processing', true)
			.withOption('serverSide', true)
			.withOption('rowCallback', rowCallback);

		// .withPaginationType('full_numbers');

		$scope.dtColumns = [

			DTColumnBuilder.newColumn('primaryEmail').withTitle('Email '),
			DTColumnBuilder.newColumn('dateCreated').withTitle('dateCreated ').renderWith(function(data, type, full) {
				return $filter('date')(data, 'medium'); //date filter 
			}).withOption('searchable', false),
			DTColumnBuilder.newColumn('dateModified').withTitle('dateModified ').renderWith(function(data, type, full) {
				return $filter('date')(data, 'medium'); //date filter 
			}).withOption('searchable', false),
			DTColumnBuilder.newColumn('smsShortCodes').withTitle('Codes ').renderWith(function(data, type, full) {
				return data = data.length;
			}).notSortable().withOption('searchable', false)

		];

		function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
			// console.log(aData);
			// Unbind first in order to avoid any duplicate handler (see https://github.com/l-lin/angular-datatables/issues/87)
			$('td', nRow).unbind('click');
			$('td', nRow).bind('click', function() {
				$scope.$apply(function() {
					$scope.message = aData._id + ' - ' + aData.primaryEmail;
					// console.log($scope.message);
					$state.go('dashboard.moreUserDetail', {
						id: aData._id
					});
				});
			});
			return nRow;
		}

		api.get('totalusercount', false, false, false, function(err, response) {
			if (err || response.error) {
				$scope.alerts = [{
					msg: response.userMessage || 'Server error! Are you connected to the internet?.',
					type: 'error'
				}];
			} else {
				$scope.usercount = response;
			}
		});



	});