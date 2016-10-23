(function () {

    var menuApp = angular.module('MenuApp');

    function CategoriesController(items) {
        var ctrl = this;
        ctrl.items = items;
    }

    menuApp.controller('CategoriesController', CategoriesController);
    CategoriesController.$inject = ['items'];

})();