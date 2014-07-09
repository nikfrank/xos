'use strict';

angular.module('calculator')
    .controller('Ctrl', function($scope){

	$scope.num1 = 0;
	$scope.num2 = 0;

	$scope.ans = 0;

	$scope.add = function(){
	    $scope.ans = $scope.num1 + $scope.num2;
	};

	$scope.sub = function(){
	    $scope.ans = $scope.num1 - $scope.num2;
	};

	$scope.div = function(){
	    $scope.ans = $scope.num1 / $scope.num2;
	};

	$scope.mul = function(){
	    $scope.ans = $scope.num1 * $scope.num2;
	};

    });
