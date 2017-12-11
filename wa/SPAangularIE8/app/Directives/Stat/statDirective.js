(function () {


    // контроллер директивы
    function _controller($scope, $timeout) {

    }

    function fn($compile, DataService) {



        function link(scope, element, attrs, controller) {



        }

        return {
            transclude: true,
            templateUrl: "app/Directives/Stat/statDirectiveTemplate.html?t=1",
            link: link,
            controller: _controller, 
            controllerAs: "directiveController",
            scope: { "statDirective":"="}
        };
    }

    angular.module('app').directive('statDirective', [fn]);

})();