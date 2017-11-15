angular.module('app').config(function ($routeProvider) {

    $routeProvider

        .when('/default', {
            template: '<div>default: [{{$resolve.name}}]</div>'
            , resolve: { name: function ($http) { return "return"; } }
            , custom: "customVal"
        })

        .when('/home', {
            template: '<div>home</div>'
            //, resolve:{name:"route"}
        })

        .when('/Book/Moby', {
            template: '<div>/Book/Moby</div>'
            //, resolve:{name:"route"}
        })

        .otherwise('/default');
});