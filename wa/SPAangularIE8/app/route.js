angular.module('app').config(function ($routeProvider, $locationProvider) {

    $routeProvider

        .when('/VirtualScroll', {
            templateUrl: 'app/Sections/VirtualScroll/VirtualScroll.html'
        })

        .when('/Pager', {
            templateUrl: "app/Sections/Pager/Pager.html",
            controller: "PagerCtrl",
            controllerAs: "pCtrl"
        });
});