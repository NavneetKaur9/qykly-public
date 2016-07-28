'use strict';
/*
 * merchant module
 */
angular.module('sbAdminApp', ["xeditable"]).controller('merchantsCtrl', function($scope, $http, DTOptionsBuilder, DTColumnBuilder, $compile, $filter, api, $window, $cookieStore) {
    var url = api.addr();
    var cats = [];
    $scope.categories = [];
    $scope.allCats = function(argument) {
        $http({
            method: 'GET',
            url: url + 'get-categories',
            headers: {
                Accept: "application/json",
                Authorization: $cookieStore.get('c2cCookie')
            },
            error: function(err) {
                $scope.alert = err.responseJSON.message; // body...
            }
        }).then(function successCallback(response) {
            $scope.categories = response.data.list;
            angular.forEach($scope.categories, function(value, key) {
                this.push({
                    'value': value,
                    'text': value
                });
            }, cats);
        }, function errorCallback(response) {
            console.log('Oops, Somethings went wrong.');
        });
    };
    $scope.allCats();
    $scope.statuses = cats;
    $scope.selected = {};
    $scope.selectAll = false;
    $scope.toggleAll = toggleAll;
    $scope.toggleOne = toggleOne;
    $scope.selectedMerchants = [];
    $scope.alert = "";
    $scope.dtInstance = {};
    $scope.reloadData = reloadData;
    $scope.testVar = "";
    // var titleHtml = '<input ng-model="selectAll" ng-click="toggleAll(selectAll, selected);" type="checkbox">';
    var titleHtml = '';
    $scope.dtOptions = DTOptionsBuilder.newOptions().withOption('ajax', {
            url: url + 'get-merchants',
            type: 'POST'
                //         'oColReorder': {
                //     'aiOrder': [5,des]
                // }
        })
        // or here
        .withDataProp('data').withOption('processing', true).withOption('serverSide', true)
        .withOption('createdRow', function(row, data, dataIndex) {
           
            $($compile(angular.element(row).contents())($scope)[3]).each(function(index) {

                var anchor = $(this).children('a');

                $(this).click(function() {

                    var frm = $(this).children('form');
                
                    $(this).find('button.btn-primary').click(function() {
                        var catName = $(".editable-has-buttons option:selected").text();
                        var merchantId = data._id;
                        var req = {
                            method: 'POST',
                            url: url + 'update-merchant-category-once-at-a-time',
                            data: {
                                merchantId: merchantId,
                                category: catName
                            }
                        }
                        $http(req).then(function successCallback(response) {
                            // $scope.alert = response.data.Success
                            // reloadData();
                            if(response.data.Success){
                                $(frm).hide(); 
                                $(anchor).removeClass('editable-hide');
                                $(anchor).text(catName);
                            }
                            console.log(response.data.Success);
                        }, function errorCallback(response) {
                            console.log(response);
                        });
                    });
                });
            });
        }).withOption('headerCallback', function(header) {
            $window.scrollTo(0, 0);
            if (!$scope.headerCompiled) {
                // Use this headerCompiled field to only compile header once
                $scope.headerCompiled = true;
                $compile(angular.element(header).contents())($scope);
            }
        }).withOption('stateSave', true).withOption('aaSorting', [5, 'desc']);
    $scope.dtColumns = [
        DTColumnBuilder.newColumn('_id').notVisible().withOption('searchable', false),
        DTColumnBuilder.newColumn(null).withTitle('#').renderWith(function(data, type, full, meta) {
            return meta.settings._iDisplayStart + meta.row + 1;
        }).notSortable().withOption('searchable', false).withOption('width', '2%'),
        DTColumnBuilder.newColumn(null).withTitle(titleHtml).notSortable().renderWith(function(data, type, full, meta) {
            var merchant_id = JSON.stringify(data._id);
            return "<input ng-model='selected[" + merchant_id + "]' name=chk[] class='multi-check' ng-click='toggleOne(selected)' type='checkbox'>";
        }).withOption('searchable', false),
        DTColumnBuilder.newColumn('name').withTitle('Merchant'),
        DTColumnBuilder.newColumn('Type').withTitle('Type').renderWith(function(data, type, full, meta) {
            $scope.type = {
                catName: data
            };
            return '<a ng-click="showSelected(\'' + data + '\')" href="#" editable-select="type.catName" e-ng-options="s.value as s.text for s in statuses">' + data + '</a>';
        }),
        DTColumnBuilder.newColumn('dateCreated').withTitle('Created').renderWith(function(data, type, full) {
            return $filter('date')(data, 'medium'); //date filter 
        }).withOption('searchable', false),
        DTColumnBuilder.newColumn('dateModified').withTitle('Updated').renderWith(function(data, type, full) {
            return $filter('date')(data, 'medium'); //date filter 
        }).withOption('searchable', false),
        DTColumnBuilder.newColumn('icon').notVisible().withOption('searchable', false),
        DTColumnBuilder.newColumn('imageUrl').notVisible().withOption('searchable', false),
        DTColumnBuilder.newColumn(null).withTitle('Category').notSortable().renderWith(function(data, type, full, meta) {
            return '<img ng-src="' + data.icon + '" height="50" width="50" alt=""/>';

        }).withOption('width', '5%').withOption('searchable', false)

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
         //$scope.dtInstance.rerender(); 
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
            $http(req).then(function successCallback(response) {
                $scope.alert = response.data.Success
                $scope.merchantdata.category = '';
                reloadData();
                console.log(response.data.Success);
            }, function errorCallback(response) {
                console.log(response);
            });
        } else {
            alert("Please select merchant");
        }
    }

    $scope.showSelected = function(selectedMerchantType) {
        $scope.selectedOption = selectedMerchantType;
    }
});