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
					// Either you specify the AjaxDataProp here
					// dataSrc: function(dataset) {
					// 	$scope.dataset = dataset;
					// 	console.log(dataset.length);
					// }

			})
			// .withDataProp('data')
			.withOption('processing', true)
			.withOption('serverSide', true)
			.withOption('rowCallback', rowCallback);

		// .withPaginationType('full_numbers');

		$scope.dtColumns = [

			DTColumnBuilder.newColumn('primaryEmail').withTitle('Email '),
			DTColumnBuilder.newColumn('dateCreated').withTitle('dateCreated ').renderWith(function(data, type, full) {
				return $filter('date')(data, 'dd/MM/yyyy'); //date filter 
			}),
			DTColumnBuilder.newColumn('dateModified').withTitle('dateModified ').renderWith(function(data, type, full) {
				return $filter('date')(data, 'dd/MM/yyyy'); //date filter 
			}),
			DTColumnBuilder.newColumn('smsShortCodes').withTitle('Codes ').renderWith(function(data, type, full) {
				return data = data.length;
			}).notSortable()

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