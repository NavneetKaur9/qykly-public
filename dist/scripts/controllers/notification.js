"use strict";angular.module("sbAdminApp",["angularUtils.directives.dirPagination"]).controller("notificationCtrl",function($scope,$http,api,$cookieStore,DTOptionsBuilder,DTColumnBuilder,$filter,$window,$compile){var token=$cookieStore.get("c2cCookie"),url=api.addr();$scope.update=function(sms,status){sms.processingStatus=status,api.post("updateProcessingStatus",!1,token,{msgText:sms.text,processingStatus:status},function(err,response){err?$scope.alert=response.message:$scope.alert=response.ok})},$scope.closeAlert=function(argument){$scope.alert=!1},$scope.assignedTexts=[],$scope.pageno=1,$scope.total_count=0,$scope.itemsPerPage=100,$scope.assignedTextsList=function(pageno){$scope.assignedTexts=[];var req={method:"get",url:url+"get-assigned-msgs/"+$scope.itemsPerPage+"/"+pageno,headers:{Authorization:$cookieStore.get("c2cCookie")}};$http(req).success(function(response){$scope.assignedTexts=response.data,$scope.total_count=response.total_count})},$scope.assignedTextsList($scope.pageno),$scope.sortType="saveTime",$scope.sortReverse=!1,$scope.order=function(sortType){$scope.sortReverse=$scope.sortType===sortType&&!$scope.sortReverse,$scope.sortType=sortType},$scope.parse=function(sms){api.post("parsemessage",!1,token,{message:sms.text,shortcode:sms.address},function(err,response){err?$scope.alert=response.message:$scope.alert=response.count+" message parsesd with "+response.shortcode})},$scope.statuses=[{value:"Pending",text:"Pending"},{value:"Complete",text:"Complete"},{value:"Exists",text:"Exists"}]});