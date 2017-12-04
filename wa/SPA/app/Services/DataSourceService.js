(function () {

    var _index = 0;

    function _fn(name) {

        _index++;

        var _curr = {
            data: [],
            onSet: [],
            itemIndex: _index,
            itemName: "DataSourceService item"
        };

        function _onSet(data) {
            for (var i = 0; i < _curr.onSet.length; i++) {
                var onSetFn = _curr.onSet[i];
                onSetFn(data);
            }
        }

        return {
            len: 0,
            updated: null,
            get: function () {
                //console.log("DataSourceService get", _curr.data.length);
                return _curr.data;
            },
            set: function (data) {
                if (_curr.data != data) {
                    //console.log("DataSourceService set ", data.length);
                    _curr.data = data;
                    this.len = _curr.data.length;
                    this.updated = new Date();
                    _onSet(data);
                }

            },
            addObserver: function (observer) {
                _curr.onSet.push(observer);
            }
        };
    }

    function fn() {
        return {
            New: function () {
                return _fn();
            }
        };
    }

    pplctn.services("DataSourceService", fn);

})();