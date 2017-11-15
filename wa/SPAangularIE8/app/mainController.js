(function () {


    function fn( $scope, $route //, $routeParams //, $location
    ) {

        function generate(n) {
            var ret = [];
            for (var i = 0; i < n; i++) {
                ret.push( {id: i, name: "name_" + i} );
            }
            return ret;
        }

        this.name = 'MainCtrl';
        this.data = [1,2,3];
        this.onClick = function (inp) { alert('MainCtrl' + inp); };
        this.data = generate(59);

    }

    angular.module('app').controller('MainCtrl',  fn);

})();