(function () {
    
    var menuApp = angular.module('MenuApp');

    function HomeController($rootScope) {
        
        $rootScope.$on('$stateChangeError',
        function (event, toState, toParams, fromState, fromParams, error) {
            console.log(error);
        });

    }

    menuApp.controller('HomeController', HomeController);
    HomeController.$inject = ['$rootScope'];

})();