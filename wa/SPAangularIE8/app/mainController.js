(function () {

    function fn($scope, $route, $timeout, TreeService//, $routeParams //, $location
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

        this.pageLength = 20;
        this.index = 0;
        this.dataLength = 100;
        this.name = 'MainCtrl';
        this.height = 200;
        this.data = [1, 2, 3];
        this.tree
        this.onClick = function (inp) { alert('MainCtrl onClick(' + inp + ')'); };
        this.data = generate(this.dataLength);
        this.setData = function (n) {
            self.data = generate(n);
        };


        var datasource =  {};

        datasource.get = function (index, count, success) {
            $timeout(function () {
                var result = [];
                var _index = index;
                if (_index < 0) {
                    _index = 0;
                }
                if (_index > 100) {
                    _index = 100;
                }
                for (var i = _index; i <= _index + count - 1; i++) {
                    result.push("item #" + i);
                }
                success(result);
            }, 100);
         };

        this.ds = datasource;



    }

    angular.module('app').controller('MainCtrl',  fn);

})();