"use strict";angular.module("sbAdminApp").controller("homeCtrl",function($scope,$http,api,$sce){api.addr();$scope.closeAlert=function(argument){$scope.alert="server error",$scope.alerts=$sce.trustAsHtml($scope.alert)}});