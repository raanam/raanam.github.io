(function () {
   
   'use strict';

    var app = angular.module('LunchCheck', []);
    app.controller('LunchCheckController', LunchCheckController);    
    
    LunchCheckController.$inject = ['$scope'];
    function LunchCheckController($scope){

        $scope.lunchItems = '';
        $scope.message = '';

        $scope.checkIfTooMuch = function(){
            //Check if empty
            if($scope.lunchItems == ''){
                $scope.message = 'Please enter data first';
                return;
            }

            var numberOfItems = $scope.lunchItems.split(',').length;
            $scope.message = numberOfItems <= 3 ? 'Enjoy!' : 'Too much!';
        }
    }

})();