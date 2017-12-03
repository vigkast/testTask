var app = angular.module('testApp', ['ui.router', 'testnavigation', 'testcontroller']);
app.config(function($stateProvider, $locationProvider, $urlRouterProvider) {
    $stateProvider
        .state('login', {
            url: "/login",
            controller: "LoginCtrl",
            templateUrl: "views/login.html"
        })
        .state('product', {
            url: "/product",
            controller: "ProductCtrl",
            templateUrl: "views/product.html"
        })
        .state('order', {
            url: "/order",
            controller: "OrderCtrl",
            templateUrl: "views/order.html"
        });
    $urlRouterProvider.otherwise("/login");
});