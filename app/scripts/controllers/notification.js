'use strict';
/**
 * 
 */
angular.module('sbAdminApp',['angularUtils.directives.dirPagination']).controller('notificationCtrl', function($scope, $http, api, $cookieStore, DTOptionsBuilder, DTColumnBuilder, $filter, $window, $compile) {
	var token = $cookieStore.get('c2cCookie');
	var url = api.addr();
	$scope.update = function(sms, status) {
		sms.processingStatus = status;
		api.post('updateProcessingStatus', false, token, {
			msgText: sms.text,
			processingStatus: status
		}, function(err, response) {
			if (err) {
				$scope.alert = response.message
			} else {
				$scope.alert = response.ok;
			}
		});
	};
	$scope.closeAlert = function(argument) {
		$scope.alert = false;
	};
	// $scope.alert = '  loading.........';
	// api.post('get-assigned-msgs', false, token, {}, function(err, response) {
	// 	if (err) {
	// 		$scope.alert = response.message
	// 	} else {
	// 		console.log(response);
	// 		$scope.msgAssigned = response;
	// 		$scope.alert = false;
	// 	}
	// });

	/*** assigned messages listing for regex creation ****/
	
	$scope.assignedTexts = []; //declare an empty array
	$scope.pageno = 1; // initialize page no to 1
	$scope.total_count = 0;
	$scope.itemsPerPage = 100; //this could be a dynamic value from a drop down
	$scope.currentPage = 1;

	$scope.assignedTextsList = function(pageno) { // This would fetch the data on page change.
		//In practice this should be in a factory.
		$scope.assignedTexts = [];
		var req = {
			method: 'get',
			url: url + "get-assigned-msgs/" + $scope.itemsPerPage + "/" + pageno,
			headers: {
				// Accept: "application/json",
				Authorization: $cookieStore.get('c2cCookie')
			},
		}
		$http(req).success(function(response) {
			$scope.assignedTexts = response.data; //ajax request to fetch data into vm.data
			$scope.total_count = response.total_count;
		});
		$scope.currentPage = pageno;
	};
	$scope.assignedTextsList($scope.pageno); // Call the function to fetch initial data on page load.

	/*** end assigned messages listing for regex creation ****/

	$scope.sortType = 'saveTime';
	$scope.sortReverse = false;
	$scope.order = function(sortType) {
		$scope.sortReverse = ($scope.sortType === sortType) ? !$scope.sortReverse : false;
		$scope.sortType = sortType;
	};
	$scope.parse = function(sms) {
		api.post('parsemessage', false, token, {
			message: sms.text,
			shortcode: sms.address
		}, function(err, response) {
			if (err) {
				$scope.alert = response.message
			} else {
				$scope.alert = response.count + ' message parsesd with ' + response.shortcode;
			}
		});
	};
	/**************************************
	 *          datatables
	 ***************************************/
	// $scope.dtInstance = {};
	// $scope.dtOptions = DTOptionsBuilder.newOptions().withOption('ajax', {
	// 		url: url + 'assigned-msgs',
	// 		type: 'POST',
	// 		headers: {
	// 			Accept: "application/json",
	// 			Authorization: token
	// 		},
	// 		error: function(err) {
	// 			// $scope.alert = err.responseJSON.message; // body...
	// 		},
	// 		data: function(aodata) {
	// 			// if (aodata.draw == "1") {
	// 			// 	aodata.order[0].column = "6";
	// 			// 	aodata.order[0].dir = 'desc';
	// 			// }
	// 		}
	// 	})
	// 	.withOption('processing', true)
	// 	// .withDataProp('data')
	// 	.withOption('serverSide', true)
	// 	.withLanguage({
	// 		'sSearch': 'Search :',
	// 		'oPaginate': {
	// 			'sNext': '»',
	// 			'sPrevious': '«'
	// 		}
	// 	}).withOption('headerCallback', function(header) {
	// 		$window.scrollTo(0, 0);
	// 	}).withOption('createdRow', function(row, data, dataIndex) {
	// 		// $compile(angular.element(row).contents())($scope);

	// 		$($compile(angular.element(row).contents())($scope)[3]).each(function(index) {
	// 			$(this).click(function() {
	// 				$(this).find('button.btn-primary').click(function() {
	// 					var selectedStatus = $(".editable-has-buttons option:selected").text();
	// 					var merchantId = data._id;
	// 					var req = {
	// 						method: 'POST',
	// 						url: url + 'updateProcessingStatus',
	// 						data: {
	// 							msgText: data.text,
	// 							processingStatus: selectedStatus
	// 						}
	// 					}
	// 					$http(req).then(function successCallback(response) {
	// 						$scope.alert = response.data.Success
	// 							// reloadData();
	// 							//hide dropdown here
	// 					}, function errorCallback(response) {
	// 						console.log(response);
	// 					});
	// 				});
	// 			});
	// 		});
	// 	});

	// $scope.dtColumns = [
	// 	DTColumnBuilder.newColumn('_id').notVisible().withOption('searchable', false),

	// 	DTColumnBuilder.newColumn('address').withTitle('Address'),
	// 	DTColumnBuilder.newColumn('text').withTitle('smsText'),

	// 	DTColumnBuilder.newColumn('time').withTitle('time ').renderWith(function(data, type, full) {
	// 		return $filter('date')(data, 'd MMM y, h:mm a'); //date filter 
	// 	}).withOption('searchable', false),
	// DTColumnBuilder.newColumn('saveTime').withTitle('saveTime ').renderWith(function(data, type, full) {
	// 	return $filter('date')(data, 'd MMM y, h:mm a'); //date filter 
	// }).withOption('searchable', false),
	// 	DTColumnBuilder.newColumn('processingStatus').withTitle('processingStatus').renderWith(function(data, type, full, meta) {
	// 		return '<a ng-click="edit(\'' + data + '\')" href="#" editable-select="type.catName" e-ng-options="s.value as s.text for s in statuses">' + data + '</a>';



	// 	})

	// ];

	// $scope.edit = function(status) {
	// 	$scope.selectedOption = status;
	// };
	$scope.statuses = [{
		value: 'Pending',
		text: 'Pending'
	}, {
		value: 'Complete',
		text: 'Complete'
	}, {
		value: 'Exists',
		text: 'Exists'
	}];

});