(function () {

    function ItemDetailsController(item) {
        var ctrl = this;
        ctrl.item = item;
    }

    var menuApp = angular.module('MenuApp');
    menuApp.controller('ItemDetailsController', ItemDetailsController);
    ItemDetailsController.$inject = ['item'];

})();