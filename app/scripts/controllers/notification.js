'use strict';
/**
 * 
 */
angular.module('sbAdminApp').controller('notificationCtrl', function($scope, $http, api, $cookieStore, DTOptionsBuilder, DTColumnBuilder, $filter, $window) {
	var token = $cookieStore.get('c2cCookie');
	var url = api.addr();
	// console.log(token);
	// api.get('userprofile', false, token, false, function(err, response) {
	// 	if (err) {
	// 		$scope.alert = response.message
	// 	} else {
	// 		$scope.user = response.user;
	// 		$scope.msgAssigned = response.result;
	// 	}
	// });
	// $scope.sortType = 'saveTime';
	// $scope.sortReverse = false;
	// $scope.order = function(sortType) {
	// 	$scope.sortReverse = ($scope.sortType === sortType) ? !$scope.sortReverse : false;
	// 	$scope.sortType = sortType;
	// };

	/**************************************
	 *          datatables
	 ***************************************/

	$scope.dtOptions = DTOptionsBuilder.newOptions().withOption('ajax', {
			url: url + 'assigned-msgs',
			type: 'POST',
			headers: {
				Accept: "application/json",
				Authorization: token
			},
			error: function(err) {
				$scope.alert = err.responseJSON.message; // body...
			},
			data: function(aodata) {
				// if (aodata.draw == "1") {
				// 	aodata.order[0].column = "6";
				// 	aodata.order[0].dir = 'desc';
				// }
			}
		})
		.withOption('processing', true)
		.withDataProp('data')
		.withOption('serverSide', true)
		.withLanguage({
			'sSearch': 'Search :',
			'oPaginate': {
				'sNext': '»',
				'sPrevious': '«'
			}
		}).withOption('headerCallback', function(header) {
			$window.scrollTo(0, 0);
		});

	$scope.dtColumns = [
		DTColumnBuilder.newColumn('_id').notVisible().withOption('searchable', false),

		DTColumnBuilder.newColumn('address').withTitle('Address'),
		DTColumnBuilder.newColumn('text').withTitle('smsText'),

		DTColumnBuilder.newColumn('time').withTitle('time ').renderWith(function(data, type, full) {
			return $filter('date')(data, 'd MMM y, h:mm a'); //date filter 
		}).withOption('searchable', false),
		DTColumnBuilder.newColumn('saveTime').withTitle('saveTime ').renderWith(function(data, type, full) {
			return $filter('date')(data, 'd MMM y, h:mm a'); //date filter 
		}).withOption('searchable', false)
	];


});