"use strict";angular.module("sbAdminApp").controller("notificationCtrl",function($scope,$http,api,$cookieStore,DTOptionsBuilder,DTColumnBuilder,$filter,$window,$compile){var token=$cookieStore.get("c2cCookie");api.addr();$scope.update=function(sms,status){sms.processingStatus=status,api.post("updateProcessingStatus",!1,token,{msgText:sms.text,processingStatus:status},function(err,response){err?$scope.alert=response.message:$scope.alert=response.ok})},$scope.alert="  loading.........",api.post("get-assigned-msgs",!1,token,{},function(err,response){err?$scope.alert=response.message:($scope.msgAssigned=response,$scope.alert=!1)}),$scope.sortType="saveTime",$scope.sortReverse=!1,$scope.order=function(sortType){$scope.sortReverse=$scope.sortType===sortType?!$scope.sortReverse:!1,$scope.sortType=sortType},$scope.parse=function(sms){api.post("parsemessage",!1,token,{message:sms.text,shortcode:sms.address},function(err,response){err?$scope.alert=response.message:$scope.alert=response.count+" message parsesd with "+response.shortcode})},$scope.statuses=[{value:"Pending",text:"Pending"},{value:"Complete",text:"Complete"},{value:"Exists",text:"Exists"}]});