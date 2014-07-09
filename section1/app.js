'use strict';

angular.module('calculator', ['ngRoute'])
    .config(function ($routeProvider) {

	$routeProvider
	    .when('/walkthrough', {templateUrl:'walkthrough.html',controller: 'Ctrl'})
	    .when('/calculator', {templateUrl:'view.html',controller: 'Ctrl'})
	    .otherwise({redirectTo: '/calculator'});
    });

console.log('what up console?!');
