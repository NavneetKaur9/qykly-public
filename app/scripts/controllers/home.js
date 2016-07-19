'use strict';
/**
 * 
 */
angular.module('sbAdminApp').controller('homeCtrl', function($scope, $http, api, $sce, $window) {
	var url = api.addr();
	$scope.alert = '<img src="assets/images/ajax-loader.gif"/>' + ' loading.........';
	$scope.alerts = $sce.trustAsHtml($scope.alert);
	$scope.closeAlert = function(argument) {
		$scope.alert = 'server error';
		$scope.alerts = $sce.trustAsHtml($scope.alert);
	};
	$scope.parseSmsResult = {
		"output": [{
			"ALERTS": 0
		}, {
			"KOTAKB": 0
		}, {
			"BSNLIN": 0
		}, {
			"PNBSMS": 0
		}, {
			"IPAYTM": 0
		}, {
			"BSNL": 0
		}, {
			"HDFCBK": 0
		}, {
			"VPAYTM": 0
		}, {
			"MYIIHT": 0
		}, {
			"ARWSVC": 0
		}, {
			"DOMINO": 0
		}, {
			"51234": 0
		}, {
			"59190": 0
		}, {
			"59011": 0
		}, {
			"FROMSC": 0
		}, {
			"651234": 0
		}],
		"smsdata": [{
			"smstext": "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ",
			"pattern": "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
			"shortcode": "AMAZON",
			"savetime": "Mon May 30 19:13:59 GMT+05:30 2016",
			"dateModified": "2016-07-02T11:59:30.183000"
		}, {
			"smstext": "lorem ipsum2 lorem ipsum2 lorem ipsum2 lorem ipsum2 lorem ipsum2 lorem ipsum2 lorem ipsum2 ",
			"pattern": "lorem ipsum2 lorem ipsum2 lorem ipsum2 lorem ipsum2 lorem ipsum2 lorem ipsum2 lorem ipsum2 lorem2 ipsum",
			"shortcode": "AMAZON",
			"savetime": "Mon May 30 19:13:59 GMT+05:30 2016",
			"dateModified": "2016-07-02T11:59:30.183000"
		}]
	};
	$scope.sortType = 'saveTime';
	$scope.sortReverse = false;
	$scope.order = function(sortType) {
		$scope.sortReverse = ($scope.sortType === sortType) ? !$scope.sortReverse : false;
		$scope.sortType = sortType;
	};
});