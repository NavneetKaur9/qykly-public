"use strict";angular.module("sbAdminApp").controller("shortcodesCtrl",function($scope,$http,api){api.addr();$scope.searchCode="",api.get("alltypes-shortcodes",!1,!1,!1,function(err,response){$scope.codes=response}),$scope.shortcode=function(){api.get("short-code",!1,!1,{sender:$scope.searchCode},function(err,response){$scope.ShortcodeSummary=response})}});