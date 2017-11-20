(function () {

    function fn( $scope, $route //, $routeParams //, $location
    ) {
        var self = this;
        function generate(n) {
            var ret = [];
            var salt = Math.random();
            for (var i = 0; i < n; i++) {
                ret.push( {id: i, name: "name_" + salt + "_" + i} );
            }
            return ret;
        }

        this.name = 'MainCtrl';
        this.data = [1,2,3];
        this.onClick = function (inp) { alert('MainCtrl onClick(' + inp + ')'); };
        this.data = generate(10000);
        this.setData = function (n) {
            self.data = generate(n);
        };

    }

    angular.module('app').controller('MainCtrl',  fn);

})();