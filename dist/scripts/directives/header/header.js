"use strict";angular.module("sbAdminApp").directive("header",function(){return{templateUrl:"scripts/directives/header/header.html",restrict:"E",replace:!0,controller:function($scope,api,$cookieStore){var token=$cookieStore.get("c2cCookie");api.get("userprofile",!1,token,!1,function(err,response){err?$scope.alert=response.message:($scope.user=response.user,$scope.msgAssigned=response.result.toString())})}}});