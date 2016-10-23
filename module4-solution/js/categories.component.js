(function () {

    var menuApp = angular.module('MenuApp');

    menuApp.component('categories', {
        templateUrl: '/views/categories-list.html',
        bindings: {
            items: '<'
        },
        controller: 'CategoriesListController'
    });


    function CategoriesListController() {
        var ctrl = this;

        ctrl.$onInit = function () {
            console.log('Category list init');
        };

        ctrl.$onChanges = function () {
            console.log('Category list change invoke');
        };

        ctrl.$onDestroy = function () {
            console.log('Category list destroyed');
        };
    }

    menuApp.controller('CategoriesListController', CategoriesListController);

})()