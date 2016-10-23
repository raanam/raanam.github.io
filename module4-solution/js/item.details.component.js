
(function () {

    var menuApp = angular.module('MenuApp');

    menuApp.component('itemDetails', {
        templateUrl: '/views/item-details.html',
        bindings: {
            item: '<'
        }
    });

})()