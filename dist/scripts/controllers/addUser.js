"use strict";angular.module("sbAdminApp").controller("addUserCtrl",function($scope,$http,api){function reset(){$scope.name="",$scope.username="",$scope.password=""}api.addr();$scope.getuser=function(){api.get("user",!1,!1,!1,function(err,response){err||response.error?$scope.alerts=[{msg:response.userMessage||"Server error! Are you connected to the internet?.",type:"error"}]:$scope.modusers=response})},$scope.getuser(),$scope.addUser=function(argument){api.post("user",!1,{name:$scope.name,username:$scope.username,password:$scope.password,role:$scope.role},function(err,response){(err||response.error)&&($scope.alerts=[{msg:response.userMessage||"Server error! Are you connected to the internet?.",type:"error"}]),$scope.alert=response,reset(),$scope.getuser()})},$scope["delete"]=function(id){api["delete"]("user",id,!1,function(err,response){(err||response.error)&&($scope.alerts=[{msg:response.userMessage||"Server error! Are you connected to the internet?.",type:"error"}]),$scope.getuser()})},$scope.closeAlert=function(index){$scope.alerts.splice(index,1)}});