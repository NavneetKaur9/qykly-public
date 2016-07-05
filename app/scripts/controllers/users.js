'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:
 * @description
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
	.controller('usersCtrl', function($scope, $location, $http, api, DTOptionsBuilder, DTColumnBuilder, $filter, $compile, $state, DTDefaultOptions) {


		var url = api.addr();

		var vm = this;
		var column = 1;
		var dir = 'desc';

		$scope.message = '';
		DTDefaultOptions.setDisplayLength(100);
		$scope.dtOptions = DTOptionsBuilder.newOptions()
			.withOption('ajax', {
				url: url + 'get-user',
				type: 'GET',
				data: function(aodata) {
					if (aodata.draw == "1") {

						aodata.order[0].column = "1";
						aodata.order[0].dir = 'desc';
					}

				}
			})
			.withDataProp('data')
			.withOption('processing', true)
			.withOption('serverSide', true)
			.withOption('rowCallback', rowCallback)
			.withLanguage({
				'sSearch': 'Search user:',
				'oPaginate': {
					'sNext': '»',
					'sPrevious': '«'
				}
			});

		$scope.dtColumns = [

			DTColumnBuilder.newColumn('_id').withTitle('# ').renderWith(function(data, type, full, meta) {
				return data = meta.row + 1 + '.';
			}).notSortable().withOption('searchable', false).withOption('width', '2%'),

			DTColumnBuilder.newColumn('primaryEmail').withTitle('Email ').withClass('emailpointer'),

			DTColumnBuilder.newColumn('dateCreated').withTitle('dateCreated ').renderWith(function(data, type, full) {
				return $filter('date')(data, 'd MMM y, h:mm a'); //date filter 
			}).withOption('searchable', false),

			DTColumnBuilder.newColumn('accessTime').withTitle('Access Time ').renderWith(function(data, type, full) {
				return $filter('date')(data, 'd MMM y, h:mm a'); //date filter 
			}).withOption('searchable', false),


			DTColumnBuilder.newColumn('lastLogin').withTitle('lastLogin ').renderWith(function(data, type, full) {
				return $filter('date')(data, 'd MMM y, h:mm a'); //date filter 
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

		// api.get('totalusercount', false, false, false, function(err, response) {
		// 	if (err || response.error) {
		// 		$scope.alerts = [{
		// 			msg: response.userMessage || 'Server error! Are you connected to the internet?.',
		// 			type: 'error'
		// 		}];
		// 	} else {
		// 		$scope.usercount = response;
		// 	}
		// });



	});