(function () {
    
    function ItemsController(items, category) {
        var ctrl = this;
        ctrl.category = category;
        ctrl.items = items;
    }

    var menuApp = angular.module('MenuApp');
    menuApp.controller('ItemsController', ItemsController);
    ItemsController.$inject = ['items', 'category'];

})();