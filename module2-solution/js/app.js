/// <reference path="angular.js" />
var app = angular.module('ShoppingListCheckOff', []);

//ToBuyController 
(function () {

    var app = angular.module('ShoppingListCheckOff');
    app.controller('ToBuyController', ToBuyController);

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(shoppingListSvc) {

        this.items = shoppingListSvc.getItems();

        this.buy = function (index) {
            shoppingListSvc.buy(index);
        }
    }

}());

//AlreadyBoughtController
(function () {

    var app = angular.module('ShoppingListCheckOff');
    app.controller('AlreadyBoughtController', AlreadyBoughtController);

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(shoppingListSvc) {

        this.items = shoppingListSvc.getBoughtItems();
    }

}());

//ShoppingListCheckOffService
(function () {

    var app = angular.module('ShoppingListCheckOff');
    app.service('ShoppingListCheckOffService', checkOffSvc);

    function checkOffSvc() {

        var service = this;

        service.itemsToBuy = [
            { name: "cookies", quantity: 10 },
            { name: "chips", quantity: 5 },
            { name: "sandwich", quantity: 15 },
            { name: "cake", quantity: 1 },
            { name: "pizza", quantity: 5 }];


        service.itemsBought = [];

        service.buy = function (index) {
            if (index > service.itemsToBuy.length) {
                throw new Error('Invalid item index');
            }

            var boughtItem = service.itemsToBuy.splice(index, 1);
            service.itemsBought.push(boughtItem[0]);
        }

        service.getItems = function () {
            return service.itemsToBuy;
        }

        service.getBoughtItems = function(){
            return service.itemsBought;
        }
    }

}());