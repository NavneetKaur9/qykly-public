"use strict";angular.module("sbAdminApp").controller("regexCtrl",function($scope,$http,DTOptionsBuilder,DTColumnBuilder,api,$filter,$window){var url=api.addr();$window.scrollTo(0,0),$scope.isCollapsed=!0,api.get("msgtype-count",!1,!1,!1,function(err,response){err||response.error?$scope.alerts=[{msg:response.userMessage||"Server error! Are you connected to the internet?.",type:"error"}]:$scope.msgtypes=response}),$scope.dtOptions=DTOptionsBuilder.newOptions().withOption("ajax",{url:url+"get-regex",type:"GET"}).withDataProp("data").withOption("processing",!0).withOption("serverSide",!0),$scope.dtColumns=[DTColumnBuilder.newColumn("address").withTitle("address"),DTColumnBuilder.newColumn("msgType").withTitle("msgType "),DTColumnBuilder.newColumn("msgSubType").withTitle("msgSubType "),DTColumnBuilder.newColumn("pattern").withTitle("pattern ").withOption("searchable",!1),DTColumnBuilder.newColumn("dateModified").withTitle("dateModified ").renderWith(function(data,type,full){return $filter("date")(data,"d MMM y, h:mm a")}).withOption("searchable",!1)]});