(function () {


    function fn($scope, $route, $routeParams, $location, Tree1Service) {
        var self = this;
        self.br = null;
        self.ts = Tree1Service;
        self.ts.setOnChange(function (data) {
            $scope.$apply(function () {
                //self.br = data;
            });
        });
        self.debug = { "name": "MainCtrl" };
        self.onClick = function () { alert("MainCtrl onClick !!!"); };

        self.ts.GenerateTestBranch(0, 10);


    }

    angular.module('app').controller('MainCtrl',  fn);

})();