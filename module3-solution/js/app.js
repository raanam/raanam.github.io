/// <reference path="angular.js" />
var app = angular.module('NarrowItDownApp', []);

//NarrowItDownController  
(function () {

    function NarrowItDownController(menuSearchSvc) {
        var ctrl = this;
        ctrl.searchTerm = '';
        ctrl.found = [];
        ctrl.loadingData = false;
        ctrl.emptyResults = false;

        ctrl.removeItem = function (index) {
            ctrl.found.splice(index, 1);
        };

        ctrl.search = function () {
            if (ctrl.searchTerm == '') {
                ctrl.emptyResults = true;
                ctrl.found = [];
                return;
            }
            ctrl.loadingData = true;
            var promise = menuSearchSvc.getMatchedMenuItems(ctrl.searchTerm);
            promise.then(function (items) {
                ctrl.loadingData = false;
                if (items == null || items.length == 0) {
                    ctrl.emptyResults = true;
                    ctrl.found = [];
                } else {
                    ctrl.emptyResults = false;
                    ctrl.found = items;
                }
            }, function (err) {
                ctrl.loadingData = false;
            });
        }
    }

    var app = angular.module('NarrowItDownApp');
    app.controller('NarrowItDownController', NarrowItDownController);
    NarrowItDownController.$inject = ['MenuSearchService'];
})();

//Menu Search Service
(function () {

    function MenuSearchService($http, $q, $timeout) {
        var service = this;

        var allItems = [];

        service.getMatchedMenuItems = function (searchItem) {
            var defer = $q.defer();

            if (allItems.length == 0) {
                var loadDataPromise = loadFromServer();
                loadDataPromise.then(function (data) {
                    allItems = data.menu_items;
                    var filteredList = filter(searchItem);
                    defer.resolve(filteredList);
                });
            }
            else {
                $timeout(function () {
                    var filteredList = filter(searchItem);
                    defer.resolve(filteredList);
                }, 1);
            }

            var promise = defer.promise;
            return promise;
        }

        function loadFromServer() {
            var promise = $http.get('https://davids-restaurant.herokuapp.com/menu_items.json');
            return promise.then(function (response) {
                return response.data;
            }, function (err) {
                alert('Error loading menu items..!');
                return err;
            });
        }

        function filter(searchItem) {
            return allItems.filter(function (eachItem) {
                return eachItem.description.indexOf(searchItem) >= 0;
            });
        }
    }


    var app = angular.module('NarrowItDownApp');
    app.service('MenuSearchService', MenuSearchService);
    MenuSearchService.$inject = ['$http', '$q', '$timeout'];
})();


//Directive.
(function () {

    function FoundItems() {
        var ddo = {
            templateUrl: 'founditems.html',
            restrict: 'E',
            scope: {
                foundItems: '<',
                onRemove: '&'
            },
            controller: foundItemsDirectiveController,
            controllerAs: 'list',
            bindToController: true
        };

        return ddo;
    };

    function Loader() {
        var ddo = {
            templateUrl: 'loader/itemsloaderindicator.template.html',
            restrict: 'E'
        }

        return ddo;
    }

    function foundItemsDirectiveController() {
        var ctrl = this;
    };

    var app = angular.module('NarrowItDownApp');
    app.directive('foundItems', FoundItems);
    app.directive('loader', Loader);
    app.controller('foundItemsDirectiveController', foundItemsDirectiveController);
})();