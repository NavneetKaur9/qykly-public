"use strict";angular.module("sbAdminApp").factory("api",["$rootScope","$http","$cookieStore",function($rootScope,$http,$cookieStore){var parseUrl="http://54.169.236.107/api2",GenerateUrl=function(theClass,object,objectId){return object&&objectId?parseUrl+"/"+theClass+"/"+object+"/"+objectId:object?parseUrl+"/"+theClass+"/"+object:parseUrl+"/"+theClass};return{addr:function(){return parseUrl+"/"},post:function(theClass,object,token,data,callback){$http.post(GenerateUrl(theClass,object,!1),data,{headers:{Authorization:token}}).success(function(response){callback(null,response)}).error(function(response){callback(!0,response||"Cannot submit data!")})},put:function(theClass,object,token,data,callback){$http.put(GenerateUrl(theClass,object,!1),data,{headers:{Authorization:token}}).success(function(response){callback(null,response)}).error(function(response){callback(!0,response||"There is some problem with your data.")})},get:function(theClass,object,token,query,callback){var config={headers:{Authorization:token}};query&&(config.params=query),$http.get(GenerateUrl(theClass,object,!1),config).success(function(response){callback(null,response)}).error(function(response){callback(!0,response||"Some error occured.")})},"delete":function(theClass,object,token,objectId,callback){$http["delete"](GenerateUrl(theClass,object,objectId),{headers:{Authorization:token}}).success(function(response){callback(null,response)}).error(function(response){callback(!0,response||"Some error occured.")})}}}]);