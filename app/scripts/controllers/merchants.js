'use strict';
/*
* merchant module
*/

angular.module('sbAdminApp').controller('merchantsCtrl', function($scope, $http, DTOptionsBuilder, DTColumnBuilder, $compile, $filter){

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


    $scope.selected = {};
    $scope.selectAll = false;
    $scope.toggleAll = toggleAll;
    $scope.toggleOne = toggleOne;

    var titleHtml = '<input ng-model="selectAll" ng-click="toggleAll(selectAll, selected)" type="checkbox">';

    $scope.dtOptions = DTOptionsBuilder.newOptions()
              .withOption('ajax', {
               // Either you specify the AjaxDataProp here
               // dataSrc: 'data',
               url: url + 'get-merchants',
               type: 'POST'
           })
           // or here
          .withDataProp('data')
          .withOption('processing', true)
          .withOption('serverSide', true)
          .withOption('createdRow', function(row, data, dataIndex) {
              // Recompiling so we can bind Angular directive to the DT
              $compile(angular.element(row).contents())($scope);
          })
          .withOption('headerCallback', function(header) {
              if (!$scope.headerCompiled) {
                  // Use this headerCompiled field to only compile header once
                  $scope.headerCompiled = true;
                  $compile(angular.element(header).contents())($scope);
              }
          
          });

    $scope.dtColumns = [
        
        DTColumnBuilder.newColumn('name').withTitle('Merchant'),
        DTColumnBuilder.newColumn('Type').withTitle('Type'),
        DTColumnBuilder.newColumn('dateCreated').withTitle('Created').renderWith(function(data, type, full) {
            return $filter('date')(data, 'medium'); //date filter 
        }),
        DTColumnBuilder.newColumn('dateModified').withTitle('Updated').renderWith(function(data, type, full) {
            return $filter('date')(data, 'medium'); //date filter 
        }),
        DTColumnBuilder.newColumn('icon').notVisible(),
        DTColumnBuilder.newColumn('imageUrl').notVisible(),
        DTColumnBuilder.newColumn(null).withTitle('Category').notSortable().renderWith(function(data, type, full, meta) {
         
            if(data.icon){
              return '<img ng-src="'+data.icon+'" height="70" width="80" alt=""/>';
            }else {
              return '<img ng-src="'+data.imageUrl+'" height="70" width="80" alt=""/>';
            }
           
        }),
        DTColumnBuilder.newColumn(null).withTitle(titleHtml).notSortable().renderWith(function(data, type, full, meta) {
            //console.log(data.);
             //return '<input ng-model="selected['+data._id+']" ng-click="toggleOne(selected)" type="checkbox">';
        })
    ];

    function toggleAll (selectAll, selectedItems) {
        for (var id in selectedItems) {
            if (selectedItems.hasOwnProperty(id)) {
                selectedItems[id] = selectAll;
            }
        }
    }
    function toggleOne (selectedItems) {
        for (var id in selectedItems) {
            if (selectedItems.hasOwnProperty(id)) {
                if(!selectedItems[id]) {
                    $scope.selectAll = false;
                    return;
                }
            }
        }
        $scope.selectAll = true;
    }


});


