'use strict';
/**
 * 
 */
angular.module('sbAdminApp').controller('notificationCtrl', function($scope, $http, api, $cookieStore, DTOptionsBuilder, DTColumnBuilder, $filter, $window) {
	var token = $cookieStore.get('c2cCookie');
	var url = api.addr();
	$scope.update = function() {

		api.post('updateProcessingStatus', false, token, {
			// msgText: msgtext array,
			// processingStatus: processingStatus
		}, function(err, response) {
			if (err) {
				$scope.alert = response.message
			} else {
				console.log(response);
			}
		});
	};
	// console.log(token);
	// api.post('assigned-msgs', false, token, false, function(err, response) {
	// 	if (err) {
	// 		$scope.alert = response.message
	// 	} else {
	// 		$scope.msgAssigned = response;
	// 		console.log(response);
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
				// $scope.alert = err.responseJSON.message; // body...
			},
			data: function(aodata) {
				// if (aodata.draw == "1") {
				// 	aodata.order[0].column = "6";
				// 	aodata.order[0].dir = 'desc';
				// }
			}
		})
		.withOption('processing', true)
		// .withDataProp('data')
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
		}).withOption('searchable', false),
		DTColumnBuilder.newColumn('processingStatus').withTitle('processingStatus').renderWith(function(data, type, full, meta) {

			return '<a href="" editable-select="type.catName" e-ng-options="s.value as s.text for s in processingStatuses">' + data + '</a>';
		})

	];

	$scope.processingStatuses = ["Pending", "Complete", "Exists"];


});