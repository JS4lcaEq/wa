(function () {

    function fn($scope, DataService//, TreeService//
    ) {
        var _c = { testObj: DataService.New()};
        var self = this;
        this.name = 'DataServiceCtrl';
        this.testObj = _c.testObj;


        describe("DataService", function () {

            it("name ok", function () {
                assert.equal(self.testObj.name, "DataService item[0]");
            });

            it("get() not setted return []", function () {
                assert.equal($.isArray(self.testObj.get()), true);
            });

            it("setData([1,2,3]) return true", function () {
                assert.equal(self.testObj.setData([1,2,3]), true);
            });

            it("get() return [1,2,3]", function () {
                assert.equal(self.testObj.get(), [1,2,3]);
            });

        });



    }

    angular.module('app').controller('DataServiceCtrl', fn);

})();