
'use strict';
/*
* merchant module
*/

angular.module('sbAdminApp').controller('merchantsCtrl', function($scope, $http){

  var url = 'http://localhost:3000/mod-api/';
  $http({
  method: 'GET',
  url: url + 'get-categories',
}).then(function successCallback(response) {
   var cats = response.data.list;
    $scope.categories = cats;
    return cats;    
  }, function errorCallback(response) {
    console.log('Oops, Somethings went wrong.');
  });

});





