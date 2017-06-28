angular.module('sbAdminApp').controller('broadcastCtrl', function($scope, $http, api, $cookieStore) {

    var url = api.addr();
    var token = $cookieStore.get('c2cCookie');

});