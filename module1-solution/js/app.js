(function () {
   
   'use strict';

    var app = angular.module('LunchCheck', []);
    app.controller('LunchCheckController', LunchCheckController);    
    
    LunchCheckController.$inject = ['$scope'];
    function LunchCheckController($scope){

        $scope.lunchItems = '';
        $scope.message = '';
        $scope.inputValid = null;

        $scope.checkIfTooMuch = function(){
            //Check if empty
            if($scope.lunchItems == ''){
                $scope.message = 'Please enter data first';
                $scope.inputValid = false;
                return;
            }

            $scope.inputValid = true;
            var numberOfItems = $scope.lunchItems.split(',').length;
            $scope.message = numberOfItems <= 3 ? 'Enjoy!' : 'Too much!';
        }
    }

})();