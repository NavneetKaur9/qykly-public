 'use strict';
 /**
  * 
  */
 angular.module('sbAdminApp', ['ngAnimate', 'ui.bootstrap']).controller('notificationCtrl', function($scope, $http, api, $cookieStore, DTOptionsBuilder, DTColumnBuilder, $filter, $window, $compile, $timeout) {
     var token = $cookieStore.get('c2cCookie');
     var url = api.addr();
     // $scope.update = function(sms, status) {
     //     sms.processingStatus = status;
     //     api.post('updateProcessingStatus', false, token, {
     //         msgText: sms.text,
     //         processingStatus: status
     //     }, function(err, response) {
     //         if (err) {
     //             $scope.alert = response.message
     //         } else {
     //             $scope.alert = response.ok;
     //         }
     //     });
     // };
     $scope.closeAlert = function(argument) {
         $scope.alert = false;
     };
     // $scope.alert = '  loading.........';
     // api.post('get-assigned-msgs', false, token, {}, function(err, response) {
     //     if (err) {
     //         $scope.alert = response.message
     //     } else {
     //         console.log(response);
     //         $scope.msgAssigned = response;
     //         $scope.alert = false;
     //     }
     // });

     /*** assigned messages listing for regex creation ****/
     $scope.alert = "";
     $scope.assignedTexts = []; //declare an empty array
     $scope.pageno = 1; // initialize page no to 1
     $scope.total_count = 0;
     $scope.itemsPerPage = 10; //this could be a dynamic value from a drop down
     $scope.currentPage = 1;

     $scope.assignedTextsList = function(pageno) { // This would fetch the data on page change.
         //uncheck header checkbox 
         $scope.selectAll = false;
         $scope.showLoadMsg = true;
         var searchParams = angular.isUndefined($scope.searchStr) ? "" : $scope.searchStr;

         $scope.assignedTexts = [];
         var req = {
             method: 'get',
             url: url + "get-assigned-msgs/" + $scope.itemsPerPage + "/" + pageno,
             headers: {
                 // Accept: "application/json",
                 Authorization: $cookieStore.get('c2cCookie')
             },
             params: {
                 searchParams: searchParams,
             }
         }
         $http(req).success(function(response) {
             $scope.assignedTexts = response.data; //ajax request to fetch data into vm.data
             $scope.total_count = response.total_count;
             $scope.currentPage = pageno;

             if ($scope.total_count == 0) {
                 $scope.showLoadMsg = false;
                 $scope.showNoData = true;
             }

             //xeditable update status
             if ($scope.assignedTexts.length > 0) {
                 $scope.showLoadMsg = false;
                 setTimeout(function() {
                     $("#notification_tbl").find('td.anchor_xeditable').each(function(index) {
                         var anchor = $(this).children('a');
                         $(anchor).click(function() {
                             var btn = $(this).closest('td').find('button.btn-primary');
                             var frm = $(this).closest('td').children('form');

                             $(btn).click(function() {
                                 var selectedStatus = $(".editable-has-buttons option:selected").text();
                                 var text = $scope.assignedTexts[index]._id;
                                 var req = {
                                     method: 'POST',
                                     url: url + 'updateProcessingStatus',
                                     data: {
                                         selectedStatus: selectedStatus,
                                         text: text,
                                         token: token
                                     }
                                 }
                                 $http(req).then(function successCallback(response) {
                                     if (response.data) {
                                         if (index !== -1) {
                                             // $scope.assignedTexts.splice(index, 1);
                                             $(frm).hide();
                                             $(anchor).removeClass('editable-hide');
                                             $(anchor).removeClass('editable-empty');
                                             $(anchor).text(selectedStatus);
                                         }

                                         $scope.alert = "Status updated successfully.";
                                         $('.alert-success').delay(3000).fadeOut();
                                     }
                                 }, function errorCallback(response) {
                                     console.log(response);
                                 });
                             }); //close btn
                         }); //close click
                     }); //close each
                 }, 3000);

             } //close if
         });

     };
     $scope.assignedTextsList($scope.pageno); // Call the function to fetch initial data on page load.

     /*** end assigned messages listing for regex creation ****/

     $scope.sortType = 'saveTime';
     $scope.sortReverse = false;
     $scope.order = function(sortType) {
         $scope.sortReverse = ($scope.sortType === sortType) ? !$scope.sortReverse : false;
         $scope.sortType = sortType;
     };
     // $scope.parse = function(sms) {
     //     api.post('parsemessage', false, token, {
     //         message: sms._id,
     //         shortcode: sms.address
     //     }, function(err, response) {
     //         if (err) {
     //             $scope.alert = response.message
     //         } else {
     //             $scope.alert = response.count + ' message parsesd with ' + response.shortcode;
     //         }
     //     });
     // };
     /**************************************
      *          datatables
      ***************************************/
     // $scope.dtInstance = {};
     // $scope.dtOptions = DTOptionsBuilder.newOptions().withOption('ajax', {
     //         url: url + 'assigned-msgs',
     //         type: 'POST',
     //         headers: {
     //             Accept: "application/json",
     //             Authorization: token
     //         },
     //         error: function(err) {
     //             // $scope.alert = err.responseJSON.message; // body...
     //         },
     //         data: function(aodata) {
     //             // if (aodata.draw == "1") {
     //             //  aodata.order[0].column = "6";
     //             //  aodata.order[0].dir = 'desc';
     //             // }
     //         }
     //     })
     //     .withOption('processing', true)
     //     // .withDataProp('data')
     //     .withOption('serverSide', true)
     //     .withLanguage({
     //         'sSearch': 'Search :',
     //         'oPaginate': {
     //             'sNext': '»',
     //             'sPrevious': '«'
     //         }
     //     }).withOption('headerCallback', function(header) {
     //         $window.scrollTo(0, 0);
     //     }).withOption('createdRow', function(row, data, dataIndex) {
     //         // $compile(angular.element(row).contents())($scope);

     //         $($compile(angular.element(row).contents())($scope)[3]).each(function(index) {
     //             $(this).click(function() {
     //                 $(this).find('button.btn-primary').click(function() {
     //                     var selectedStatus = $(".editable-has-buttons option:selected").text();
     //                     var merchantId = data._id;
     //                     var req = {
     //                         method: 'POST',
     //                         url: url + 'updateProcessingStatus',
     //                         data: {
     //                             msgText: data.text,
     //                             processingStatus: selectedStatus
     //                         }
     //                     }
     //                     $http(req).then(function successCallback(response) {
     //                         $scope.alert = response.data.Success
     //                             // reloadData();
     //                             //hide dropdown here
     //                     }, function errorCallback(response) {
     //                         console.log(response);
     //                     });
     //                 });
     //             });
     //         });
     //     });

     // $scope.dtColumns = [
     //     DTColumnBuilder.newColumn('_id').notVisible().withOption('searchable', false),

     //     DTColumnBuilder.newColumn('address').withTitle('Address'),
     //     DTColumnBuilder.newColumn('text').withTitle('smsText'),

     //     DTColumnBuilder.newColumn('time').withTitle('time ').renderWith(function(data, type, full) {
     //         return $filter('date')(data, 'd MMM y, h:mm a'); //date filter 
     //     }).withOption('searchable', false),
     // DTColumnBuilder.newColumn('saveTime').withTitle('saveTime ').renderWith(function(data, type, full) {
     //     return $filter('date')(data, 'd MMM y, h:mm a'); //date filter 
     // }).withOption('searchable', false),
     //     DTColumnBuilder.newColumn('processingStatus').withTitle('processingStatus').renderWith(function(data, type, full, meta) {
     //         return '<a ng-click="edit(\'' + data + '\')" href="#" editable-select="type.catName" e-ng-options="s.value as s.text for s in statuses">' + data + '</a>';



     //     })

     // ];

     // $scope.edit = function(status) {
     //     $scope.selectedOption = status;
     // };
     $scope.statuses = [{
         value: 'Pending',
         text: 'Pending'
     }, {
         value: 'Complete',
         text: 'Complete'
     }, {
         value: 'Exists',
         text: 'Exists'
     }];

     //2 aug shweta
     //shows selected option 
     $scope.showSelected = function(selectedStatus) {
         $scope.selectedOption = selectedStatus;
     };
     //shweta
     //remove promotional messages
     $scope.removeAssignedMessages = function(text, index) {
         var checkstr = confirm('are you sure you want to delete this?');

         if (checkstr == true) {
             var req = {
                 method: 'POST',
                 url: url + 'updateProcessingStatus',
                 data: {
                     selectedStatus: "Promotional",
                     text: text,
                     token: token
                 }
             }
             $http(req).then(function successCallback(response) {
                 if (response.data) {
                     if (index !== -1) {
                         $scope.assignedTexts.splice(index, 1);
                     }
                     $scope.alert = "Deleted successfully.";
                     $('.alert-success').delay(3000).fadeOut();
                 }
             }, function errorCallback(response) {
                 console.log(response);
             });
         } else {
             return false;
         }
     };
     //end remove promotional messages

     //all checked
     $scope.checkAll = function() {
         var checkedBoolVal = document.getElementById("selectAll").checked;
         $('#selectAll').closest('table').find('td input:checkbox').prop('checked', checkedBoolVal);
     };

     //update multiple status
     $scope.updateMultipleSmsStatus = function() {
         var selectedStatus = angular.isUndefined($scope.selectedStatus) ? "" : $scope.selectedStatus;
         var texts = [];
         if (selectedStatus == "") {
             alert('Please select a status');
             return;
         }
         $.each($(".messageCheckbox:checked"), function(index, value) {
             texts.push($(this).val());
         });

         if (texts.length == 0) {
             alert("Please select sms");
             return;
         }
         var req = {
             method: 'POST',
             url: url + 'updateMultipleProcessingStatus',
             data: {
                 selectedStatus: selectedStatus,
                 text: texts,
                 token: token
             }
         }
         $http(req).then(function successCallback(response) {
             if (response.data) {
                 $scope.alert = "Status updated successfully.";
                 $('.alert-success').delay(3000).fadeOut();
                 window.location.reload();
             }
         }, function errorCallback(response) {
             console.log(response);
         });
     };
     //loader
     $("#parseMsgProgressBar").hide();
     $scope.parse = function(sms, index) {
         api.post('parseassignedmessage', false, token, {
             message: sms._id,
             shortcode: sms.address
         }, function(err, response) {
             if (err) {
                 $scope.alert = response.message
             } else {
                 $("#parseMsgProgressBar").hide();
                 if (response.count === 1) {
                     if (index !== -1) {
                         $scope.assignedTexts.splice(index, 1);
                     }
                 }
                 $scope.alert = response.count + ' message parsesd with ' + response.shortcode;
                 // $('.alert-success').delay(2000).fadeOut();
             }
         });

         $scope.max = 100;
         $scope.data = {
             progress: 0
         };

         (function progress() {
             if ($scope.data.progress < 100) {
                 $timeout(function() {
                     $scope.data.progress += 1;
                     progress();
                 }, 100);
             }
         })();

         $("#parseMsgProgressBar").show();
     };
     //loader
 });