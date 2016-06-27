"use strict";angular.module("sbAdminApp").controller("usersCtrl",function($scope,$location,$http,api,DTOptionsBuilder,DTColumnBuilder,$filter,$compile,$state){function rowCallback(nRow,aData,iDisplayIndex,iDisplayIndexFull){return $("td",nRow).unbind("click"),$("td",nRow).bind("click",function(){$scope.$apply(function(){$scope.message=aData._id+" - "+aData.primaryEmail,$state.go("dashboard.moreUserDetail",{id:aData._id})})}),nRow}var url="http://localhost:3000/mod-api/";$scope.message="",$scope.dtOptions=DTOptionsBuilder.newOptions().withOption("ajax",{url:url+"get-user",type:"GET"}).withDataProp("data").withOption("processing",!0).withOption("serverSide",!0).withOption("rowCallback",rowCallback),$scope.dtColumns=[DTColumnBuilder.newColumn("primaryEmail").withTitle("Email "),DTColumnBuilder.newColumn("dateCreated").withTitle("dateCreated ").renderWith(function(data,type,full){return $filter("date")(data,"dd/MM/yyyy")}).withOption("searchable",!1),DTColumnBuilder.newColumn("dateModified").withTitle("dateModified ").renderWith(function(data,type,full){return $filter("date")(data,"dd/MM/yyyy")}).withOption("searchable",!1),DTColumnBuilder.newColumn("smsShortCodes").withTitle("Codes ").renderWith(function(data,type,full){return data=data.length}).notSortable().withOption("searchable",!1)],api.get("totalusercount",!1,!1,!1,function(err,response){err||response.error?$scope.alerts=[{msg:response.userMessage||"Server error! Are you connected to the internet?.",type:"error"}]:$scope.usercount=response})});