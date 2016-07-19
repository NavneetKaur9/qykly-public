'use strict';
/**
 * 
 */
angular.module('sbAdminApp').controller('homeCtrl', function($scope, $http, api, $sce) {

	var url = api.addr();
	// $scope.alert = '<img src="assets/images/ajax-loader.gif"/>' + ' loading.........';
	// $scope.alerts = $sce.trustAsHtml($scope.alert);


	$scope.closeAlert = function(argument) {
		$scope.alert = 'server error';
		$scope.alerts = $sce.trustAsHtml($scope.alert);

	};
	// $scope.parseSmsResult = {
	// 	"output": [{
	// 		"ALERTS": 0
	// 	}, {
	// 		"KOTAKB": 0
	// 	}, {
	// 		"BSNLIN": 0
	// 	}, {
	// 		"PNBSMS": 0
	// 	}, {
	// 		"IPAYTM": 0
	// 	}, {
	// 		"BSNL": 0
	// 	}, {
	// 		"HDFCBK": 0
	// 	}, {
	// 		"VPAYTM": 0
	// 	}, {
	// 		"MYIIHT": 0
	// 	}, {
	// 		"ARWSVC": 0
	// 	}, {
	// 		"DOMINO": 0
	// 	}, {
	// 		"51234": 0
	// 	}, {
	// 		"59190": 0
	// 	}, {
	// 		"59011": 0
	// 	}, {
	// 		"FROMSC": 0
	// 	}, {
	// 		"651234": 0
	// 	}],
	// 	"smsdata": [{
	// 		"smstext": "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ",
	// 		"pattern": "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum"
	// 	}, {
	// 		"smstext": "lorem ipsum2 lorem ipsum2 lorem ipsum2 lorem ipsum2 lorem ipsum2 lorem ipsum2 lorem ipsum2 ",
	// 		"pattern": "lorem ipsum2 lorem ipsum2 lorem ipsum2 lorem ipsum2 lorem ipsum2 lorem ipsum2 lorem ipsum2 lorem2 ipsum"
	// 	}]
	// }

});