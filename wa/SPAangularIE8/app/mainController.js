(function () {

    function fn($scope, $route, TreeService//, $routeParams //, $location
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
        this.height = 200;
        this.data = [1,2,3];
        this.onClick = function (inp) { alert('MainCtrl onClick(' + inp + ')'); };
        this.data = generate(10000);
        this.setData = function (n) {
            self.data = generate(n);
        };

        this.ts = TreeService.New();

        this.ts.setOnLoaded(
            function (loadedBranch) {
                console.log("loadedBranch: ", loadedBranch);
            }
        );

        this.ts.open("null");
        this.ts.load(1);
        this.ts.load(2);

        console.log("ts:", this.ts, " debug:", this.ts.debug());

    }

    angular.module('app').controller('MainCtrl',  fn);

})();