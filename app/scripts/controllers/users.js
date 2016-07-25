'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:
 * @description
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp').controller('usersCtrl', function($scope, $location, $http, api, DTOptionsBuilder, DTColumnBuilder, $filter, $compile, $state, DTDefaultOptions, $window, $cookieStore) {
	var url = api.addr();
	var vm = this;
	var column = 1;
	var dir = 'desc';
	var prevStart = "";
	$scope.message = '';
	DTDefaultOptions.setDisplayLength(100);
	$scope.dtOptions = DTOptionsBuilder.newOptions().withOption('ajax', {
		url: url + 'get-user',
		type: 'POST',
		headers: {
			Accept: "application/json",
			Authorization: $cookieStore.get('c2cCookie')
		},
		error: function(err) {
			$scope.alert = err.responseJSON.message; // body...
		},
		data: function(aodata) {
			if (aodata.draw == "1") {
				aodata.order[0].column = "4";
				aodata.order[0].dir = 'desc';
			}
		}
	}).withDataProp('data').withOption('processing', true).withOption('serverSide', true).withOption('rowCallback', rowCallback).withLanguage({
		'sSearch': 'Search user:',
		'oPaginate': {
			'sNext': '»',
			'sPrevious': '«'
		}
	}).withOption('headerCallback', function(header) {
		$window.scrollTo(0, 0);
	}).withOption('stateSave', true);
	$scope.dtColumns = [
		DTColumnBuilder.newColumn('_id').notVisible().withOption('searchable', false),
		DTColumnBuilder.newColumn(null).withTitle('# ').renderWith(function(data, type, full, meta) {
			return data = meta.settings._iDisplayStart + meta.row + 1;
		}).notSortable().withOption('searchable', false).withOption('width', '2%'),
		DTColumnBuilder.newColumn('primaryEmail').withTitle('Email ').withClass('emailpointer'),
		DTColumnBuilder.newColumn('accessTime').withTitle('Access Time ').renderWith(function(data, type, full) {
			return $filter('date')(data, 'd MMM y, h:mm a'); //date filter 
		}).withOption('searchable', false),
		DTColumnBuilder.newColumn('lastLogin').withTitle('First Login ').renderWith(function(data, type, full) {
			return $filter('date')(data, 'd MMM y, h:mm a'); //date filter 
		}).withOption('searchable', false),
		DTColumnBuilder.newColumn('smsShortCodes').withTitle('Codes ').renderWith(function(data, type, full) {
			return data = data.length;
		}).notSortable().withOption('searchable', false)
	];

	function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
		// console.log(aData);
		$('td', nRow).unbind('click');
		$('td', nRow).bind('click', function() {
			$scope.$apply(function() {
				$scope.message = aData._id + ' - ' + aData.primaryEmail;
				$state.go('dashboard.moreUserDetail', {
					id: aData._id
				});
			});
		});
		return nRow;
	}
	$scope.closeAlert = function(argument) {
		$scope.alert = false;
	};
});