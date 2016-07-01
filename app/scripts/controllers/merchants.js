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
    $scope.selectedMerchants = [];
    $scope.alert = "";
 
   // var $table             = table.table().node();
//    var $chkbox_all        = $('tbody input[type="checkbox"]', $table);
//    var $chkbox_checked    = $('tbody input[type="checkbox"]:checked', $table);
//    var chkbox_select_all  = $('thead input[name="select_all"]', $table).get(0);
// console.log($chkbox_checked.length);

// var x = document.getElementById("DataTables_Table_0").rows.length;
// console.log(x);
var chkbox_checked  = $('input[name="chk[]"]:checked').length;
var result = document.getElementsByClassName("multi-check");
//var atLeastOneIsChecked = $(result':checked').length ;

// If none of the checkboxes are checked
   if(chkbox_checked === 0){
      $scope.selectAll = false;
   } 
console.log(chkbox_checked);
//console.log(atLeastOneIsChecked);
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
            $scope.selected[full._id] = false;
            var merchant_id = JSON.stringify(data._id);
            return "<input ng-model='selected["+merchant_id+"]' name=chk[] class='multi-check' ng-click='toggleOne(selected)' type='checkbox'>";
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
          $scope.selectedMerchants.push(id);
            if (selectedItems.hasOwnProperty(id)) {
                if(!selectedItems[id]) {
                    $scope.selectAll = false;
                    return;
                }
            }
        }
        $scope.selectAll = true;
    }

    $scope.changeMerchantCategory = function(){
       var category = $scope.merchantdata.category;
       var allMerchants = $scope.selected;

      var merchants = [];
      angular.forEach(allMerchants, function(value, merchant_id) {
        if(value){
          this.push(merchant_id);
        }
      }, merchants);

       var req = {
                   method: 'POST',
                   url: url + 'update-merchant-category',
                   data: { merchants: merchants, 'category' : category }
                  }

      $http(req).then(
        function successCallback(response) {
           $scope.alert = response.data.Success
      console.log(response.data.Success);
  }, function errorCallback(response) {
    console.log(response);
  });

     }

});


