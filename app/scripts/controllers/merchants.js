'use strict';
/*
 * merchant module
 */

angular.module('sbAdminApp',["xeditable"]).controller('merchantsCtrl', function($scope, $http, DTOptionsBuilder, DTColumnBuilder, $compile, $filter, api, $window) {
var tableData = [];
    var url = api.addr();
     var cats = [];
    // var catArr = [];
     $scope.categories = [];

      $scope.allCats = function (argument) {
    $http({
            method: 'GET',
            url: url + 'get-categories',
        }).then(function successCallback(response) {
            // console.log(response.data.list);
             // var cats = response.data.list;
            $scope.categories = response.data.list;
            angular.forEach($scope.categories, function(value, key) {
 // this.push(key + ': ' + value);
  this.push({'value':value, 'text':value});
}, cats);
            // return cats;
             // console.log(cats);
            // cats.push(response.data.list);
            // catArr = $scope.categories;
         // console.log($scope.categories);
            // return catArr;
        }, function errorCallback(response) {
            console.log('Oops, Somethings went wrong.');
        });
      };
       
   $scope.allCats(); 
   $scope.statuses = cats; 
   // console.log(cats);
 // console.log(catArr);
    $scope.selected = {};
    $scope.selectAll = false;
    $scope.toggleAll = toggleAll;
    $scope.toggleOne = toggleOne;
    $scope.selectedMerchants = [];
    $scope.alert = "";
    $scope.dtInstance = {};
    $scope.reloadData = reloadData;
    $scope.changeTextToSelectBox = changeTextToSelectBox;
    $scope.testVar = "";
    // $scope.showStatus = showStatus();

    // var titleHtml = '<input ng-model="selectAll" ng-click="toggleAll(selectAll, selected);" type="checkbox">';
    var titleHtml = '';

    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withOption('ajax', {
            url: url + 'get-merchants',
            type: 'POST'
    //         'oColReorder': {
    //     'aiOrder': [5,des]
    // }
        })
        // or here
        .withDataProp('data')
        .withOption('processing', true)
        .withOption('serverSide', true)
        .withOption('createdRow', function(row, data, dataIndex) {
            // console.log(dataIndex);
           // console.log(data[0]);   
          // console.log($compile(angular.element(row).contents())($scope)[3]);
           $($compile(angular.element(row).contents())($scope)[3]).each(function(index) {
            // console.log(index);
            // console.log(dataIndex);
    var cellText = $(this).html();    

    var testdata = $(this).data('value');
    // console.log($(this).val(testdata));
       // console.log(cellText);
      $(this).click(function(){
        // console.log($(this).attr('id'));
         // console.log(cellText);
        var a = $(this).find('button.btn-primary');
        // console.log(a);
        $(this).find('button.btn-primary').click(function(){
            // console.log($( ".editable-has-buttons option:selected" ).text());
             // console.log(data._id);
             var catName = $( ".editable-has-buttons option:selected" ).text();
             var merchantId = data._id;

             var req = {
                method: 'POST',
                url: url + 'update-merchant-category-once-at-a-time',
                data: {
                    merchantId: merchantId,
                    category: catName
                }
            }


            $http(req).then(
                function successCallback(response) {
                    $scope.alert = response.data.Success
                   
                    reloadData();
                    console.log(response.data.Success);
                },
                function errorCallback(response) {
                    console.log(response);
                });
        });
      });
});
        })
        .withOption('headerCallback', function(header) {
            $window.scrollTo(0, 0);

            if (!$scope.headerCompiled) {
                // Use this headerCompiled field to only compile header once
                $scope.headerCompiled = true;
                $compile(angular.element(header).contents())($scope);
            }
        })
        .withOption('drawCallback', function(settings,data) {
            console.log(settings);
            $scope.showStatus = function () {
                // console.log($scope.statuses);
           //  console.log(selected);
            var selected = $filter('filter')($scope.statuses, {value: $scope.type.catName});
            return ($scope.type.catName && selected.length) ? selected[0].text : 'Not set';
          };
        })
        .withOption('stateSave', true).withOption('aaSorting', [5, 'desc']);


    // $scope.dtInstance.on( 'click', 'tbody td:not(:first-child)', function (e) {
    //         editor.inline( this );
    //     } );
    $scope.dtColumns = [

        DTColumnBuilder.newColumn('_id').notVisible().withOption('searchable', false),
        DTColumnBuilder.newColumn(null).withTitle('#').renderWith(function(data, type, full, meta) {
            return meta.settings._iDisplayStart + meta.row + 1;
        }).notSortable().withOption('searchable', false).withOption('width', '2%'),
        DTColumnBuilder.newColumn(null).withTitle(titleHtml).notSortable().renderWith(function(data, type, full, meta) {
            var merchant_id = JSON.stringify(data._id);
            return "<input ng-model='selected[" + merchant_id + "]' name=chk[] class='multi-check' ng-click='toggleOne(selected)' type='checkbox'>";
        }),
        DTColumnBuilder.newColumn('name').withTitle('Merchant'),
        DTColumnBuilder.newColumn('Type').withTitle('Type').renderWith(function(data, type, full, meta){
            tableData = data;
            // console.log(tableData);
          //  console.log(full);
           //   var fullObj = full;
           // console.log(fullObj);
           // console.log($scope.statuses);
             // console.log(full._id);
         $scope.type = {
                catName: data
            }; 
           var selectedText = $filter('filter')($scope.statuses, {value: data}); 

           // console.log(selectedText[0]); 
 // console.log($scope.type.catName);
          // $scope.showStatus = function showStatus(tableData) {console.log($scope.statuses);
          //    console.log(selected);
          //   var selected = $filter('filter')($scope.statuses, {value: $scope.type.catName});
          //   return ($scope.type.catName && selected.length) ? selected[0].text : 'Not set';
          // };
  //         $scope.showStatus = function(user) {
  //           console.log(user);
  //   var selected = [];
  //   if(user.status) {
  //     selected = $filter('filter')($scope.statuses, {value: user.status});
  //   }
  //   return selected.length ? selected[0].text : 'Not set';
  // };

          $scope.testVar = full._id;
          //console.log($scope.testVar);
          //  return '<a href="#" editable-select="'+data+'">'+data+'</a>';
            return '<a href="#" id="hrefId_'+full._id+'" data-pk="'+data+'" data-value="'+data+'" editable-select="type.catName" e-ng-options="s.value as s.text for s in statuses" onaftersave=updateMerchantType($data)>'+data+'</a>';
            //return '<span ng-click="changeTextToSelectBox()">'+data+'</span>'
        }),
        DTColumnBuilder.newColumn('dateCreated').withTitle('Created').renderWith(function(data, type, full) {
            return $filter('date')(data, 'medium'); //date filter 
        }).withOption('searchable', false),
        DTColumnBuilder.newColumn('dateModified').withTitle('Updated').renderWith(function(data, type, full) {
            return $filter('date')(data, 'medium'); //date filter 
        }).withOption('searchable', false),
        DTColumnBuilder.newColumn('icon').notVisible(),
        DTColumnBuilder.newColumn('imageUrl').notVisible(),
        DTColumnBuilder.newColumn(null).withTitle('Category').notSortable().renderWith(function(data, type, full, meta) {
            return '<img ng-src="' + data.icon + '" height="50" width="50" alt=""/>';
        }).withOption('width', '5%')

    ];

    function toggleAll(selectAll, selectedItems) {
        for (var id in selectedItems) {
            if (selectedItems.hasOwnProperty(id)) {
                selectedItems[id] = selectAll;
            }
        }
    }

    function toggleOne(selectedItems) {
        for (var id in selectedItems) {
            $scope.selectedMerchants.push(id);
            if (selectedItems.hasOwnProperty(id)) {
                if (!selectedItems[id]) {
                    $scope.selectAll = false;
                    return;
                }
            }
        }
        $scope.selectAll = true;
    }

    function reloadData() {
        // $scope.dtInstance.rerender(); 
        window.location.reload();
    }

    $scope.changeMerchantCategory = function() {
        var category = angular.isUndefined($scope.merchantdata) ? "" : $scope.merchantdata.category;
        var allMerchants = $scope.selected;

        //check empty
        if (category == "") {
            alert('Please select category');
            return;
        }

        if (Object.keys(allMerchants).length == 0) {
            alert('Please select merchant');
            return;
        }

        var merchants = [];
        var atleastOneSelected = false;
        angular.forEach(allMerchants, function(value, merchant_id) {
            if (value) {
                this.push(merchant_id);
                atleastOneSelected = true;
            }
        }, merchants);

        if (atleastOneSelected) {
            var req = {
                method: 'POST',
                url: url + 'update-merchant-category',
                data: {
                    merchants: merchants,
                    'category': category
                }
            }


            $http(req).then(
                function successCallback(response) {
                    $scope.alert = response.data.Success
                    $scope.merchantdata.category = '';
                    reloadData();
                    console.log(response.data.Success);
                },
                function errorCallback(response) {
                    console.log(response);
                });
        } else {
            alert("Please select merchant");
        }

    }

    

     $scope.updateMerchantType = function(data,newVar) {
 console.log(data);
 console.log(newVar);
// newVar = "";

// $( "a" ).each(function( index ) {
//   console.log( 0 + ": " + $( this ).attr('data-value') );
// });
       // $("a").;
       // console.log($("a"));
//console.log($('#hrefId').attr('data-value'));
     //   console.log(data);
     //   console.log($scope.type.catName);
   // return $http.post('/updateUser', {id: $scope.user.id, name: data});
  };


    function changeTextToSelectBox(data){
        alert(data);
        alert('dhgsdfdfhg');
        '<ul><li>render me please</li></ul>';

    }



  // $scope.updateMerchantCategoryOneByOne = function(){

  // };

});