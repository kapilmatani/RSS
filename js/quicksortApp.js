var app = angular.module('quicksortApp',[]);


app.controller('mainCtrl',['$scope',function($scope) {
    $scope.string;
    $scope.userMessage;
    $scope.arr = [];

    $scope.addvar = function(){
        if($scope.string == ""){
            $scope.userMessage = "Please Enter A string";
        }
        else{
            $scope.userMessage = "Added";
            $scope.arr.push($scope.string);
            $scope.string = "";
        }
        console.log($scope.arr);
    }

    $scope.sort = function(){
        $scope.arr.sort(function(a, b){
        return a.length - b.length;
    });
    }
}]);