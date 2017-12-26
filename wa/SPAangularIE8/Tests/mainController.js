(function () {

    function fn($scope, $route, $timeout, $routeParams , $location//, TreeService//
    ) {
        var _c = { describes: {} };
        var self = this;
        this.name = 'MainCtrl';
        this.run = function () { mocha.run(); };
        this.isExistsDescribes = function (describesName) {
            console.log(_c.describes);
            if (_c.describes[describesName]) {
                return true;
            }
            _c.describes[describesName] = { added: new Date() };
            return false;
        }


    }

    angular.module('app').controller('MainCtrl',  fn);

})();