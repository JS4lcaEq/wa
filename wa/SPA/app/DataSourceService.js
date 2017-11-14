(function () {
    var _store = {};
    var _index = 0;
    function _fn(name) {
        var _curr = {
            data: [],
            onSet: [],
            itemIndex: _index,
            itemName: name
        };
        _index++;
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

    function fn() {
        return {
            New: function () {
                return this.Get();
            },
            Get: function (name) {
                var _name = "WindowService" + _store.length;
                if (name) {
                    _name = name;
                }
                if (!_store[_name]) {
                    _store[_name] = _fn(_name);
                }
                return _store[_name];
            }
        };
    }

    pplctn.services("DataSourceService", fn);

})();