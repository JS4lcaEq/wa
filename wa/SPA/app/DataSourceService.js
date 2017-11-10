(function () {

    function fn(injections) {
        var _curr = {
            data: [],
            onSet: []
        };
        function _onSet(data) {
            for (var i = 0; i < _curr.onSet.length; i++) {
                var onSetFn = _curr.onSet[i];
                onSetFn(data);
            }
        }
        return {
            get: function () {
                console.log("DataSourceService get", _curr.data.length);
                return _curr.data;
            },
            set: function (data) {
                console.log("DataSourceService set ", data.length);
                _curr.data = data;
                this.len = _curr.data.length;
                this.updated = new Date().getTime();
                _onSet(data);
            },
            addObserver: function (observer) {
                _curr.onSet.push(observer);
            }
        };
    }

    pplctn.services("DataSourceService", fn);

})();