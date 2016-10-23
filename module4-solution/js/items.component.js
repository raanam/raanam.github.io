(function () {
    
    var menuApp = angular.module('MenuApp');

    menuApp.component('items', {
        templateUrl: 'views/item-list.html',
        bindings: {
            items: '<',
            categoryShortName: '<'
        }
    });

})()