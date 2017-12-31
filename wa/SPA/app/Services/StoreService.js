(function () {
    var _store = {};

    function fn() {
        return {
            name: "StoreService",
            Set: function (obj, name) {
                if (_store[name] && _store[name] != undefined) {
                    throw new Error("StoreService error: creating item '" + name + "' is exists, already!!!");
                    return false;
                }
                _store[name] = obj;
                return true;
            },
            Get: function (name) {
                if (_store[name]) {
                    return _store[name];
                }
                throw new Error("StoreService error: calling item '" + name + "' is not exists!!!");
                return false;
            }
        };
    }

    app.services("StoreService", fn);

})();