(function () {

    function MenuDataService($http, $q) {
        var service = this;

        var allCategories = [];
        var menuItems = [];

        service.getAllCategories = function () {
            var defer = $q.defer();
            var promise = $http.get('https://davids-restaurant.herokuapp.com/categories.json');

            promise.then(function (response) {
                allCategories = response.data;
                defer.resolve(allCategories);
            }, function (err) {
                defer.reject(err);
            });

            return defer.promise;
        }

        service.getCategoryByName = function (categoryShortName) {
            var defer = $q.defer();
            var promise = $http.get('https://davids-restaurant.herokuapp.com/categories.json');

            promise.then(function (response) {
                var matchingCategory = response.data.filter(function (eachCategory) {
                    return eachCategory.short_name == categoryShortName;
                });
                defer.resolve(matchingCategory[0]);
            }, function (err) {
                defer.reject(err);
            });

            return defer.promise;
        }

        service.getItemsForCategory = function (categoryShortName) {
            var defer = $q.defer();
            var promise = $http.get('https://davids-restaurant.herokuapp.com/menu_items.json', { params: { categoryShortName: categoryShortName } });

            promise.then(function (response) {
                menuItems = response.data.menu_items;
                defer.resolve(response.data);
            }, function (err) {
                defer.reject(err);
            });

            return defer.promise;
        }

        service.getItemById = function (categoryShortName, itemId) {
            var defer = $q.defer();

            if (menuItems == null) {
                service
                .getItemsForCategory(categoryShortName)
                .then(function (data) {
                    var matchingItem = data.filter(function (eachMenuItem) {
                        return eachMenuItem.id == itemId;
                    });
                    defer.resolve(matchingItem[0]);
                });
            }
            else {
                var matchingItem = menuItems.filter(function (eachMenuItem) {
                    return eachMenuItem.id == itemId;
                });
                defer.resolve(matchingItem[0]);
            }

            return defer.promise;
        }
    }

    var dataModule = angular.module('data');
    dataModule.service('MenuDataService', MenuDataService);
    MenuDataService.$inject = ['$http', '$q'];

})();