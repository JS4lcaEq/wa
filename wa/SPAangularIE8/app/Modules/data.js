(function () {

    angular.module('data', []);

    /*  */
    function dataService() {



        this.test = function () {
            return "module: 'data', service: 'dataService', function: 'test'"
        };

        this.setTestArray = function (length, target) {
            target.length = 0;
            for (var i = 0; i < length; i++) {
                var number = Math.random();
                var item = { "id": i, "name": "name_" + number, "number": number};
                target.push(item);
            }
        };



        this.getTestArray = function (length) {
            var target = [];
            this.setTestArray(length, target);
            return target;
        };

        this.sort = function (sortFieldName, target) {
            function srt(a, b) {
                if (a[sortFieldName] > b[sortFieldName]) return 1;
                if (a[sortFieldName] < b[sortFieldName]) return -1;
            }
            target.sort(srt);
        }
    }

    angular.module('data').service('dataService', dataService);

})();