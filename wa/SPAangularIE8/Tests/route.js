angular.module('app').config(function ($routeProvider, $locationProvider) {

    $routeProvider

        .when('/dataService', {
            templateUrl: 'dataService/dataService.html',
            controller: "DataServiceCtrl",
            controllerAs: "dsCtrl"
        })

        .when('/Pager', {
            templateUrl: "app/Sections/Pager/Pager.html",
            controller: "PagerCtrl",
            controllerAs: "pCtrl"
        });
});