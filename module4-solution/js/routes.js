(function () {

    var menuApp = angular.module('MenuApp');
    menuApp.config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function RoutesConfig($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider.state('home', {
            url: '/',
            templateUrl: '/views/home.html',
            controller: 'HomeController as ctrl'
        });

        $stateProvider.state('categories', {
            url: '/categories',
            templateUrl: '/views/categories.html',
            controller: 'CategoriesController as ctrl',
            resolve: {
                items: ['MenuDataService', function (menuDataService) {
                    return menuDataService.getAllCategories();
                }]
            }
        });

        $stateProvider.state('items', {
            url: '/categories/{categoryShortName}/items',
            templateUrl: '/views/items.html',
            controller: 'ItemsController as ctrl',
            resolve: {
                items: ['$stateParams', 'MenuDataService', function ($stateParams, menuDataService) {
                    var categoryShortName = $stateParams['categoryShortName'];
                    return menuDataService.getItemsForCategory(categoryShortName);
                }],
                category: ['$stateParams', 'MenuDataService', function ($stateParams, menuDataService) {
                    var categoryShortName = $stateParams['categoryShortName'];
                    return menuDataService.getCategoryByName(categoryShortName);
                }]
            }
        });

        $stateProvider.state('items.details', {
            url: '/{itemId}/details',
            template: '<item-details item="ctrl.item"></item-details>',
            controller: 'ItemDetailsController as ctrl',
            resolve: {
                item: ['$stateParams', 'MenuDataService', function ($stateParams, menuDataService) {
                    var itemId = $stateParams['itemId'];
                    var categoryShortName = $stateParams['categoryShortName'];
                    return menuDataService.getItemById(categoryShortName, itemId);
                }]
            }
        });

    }

})();