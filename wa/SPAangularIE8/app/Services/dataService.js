(function () {

    function fn() {

        var _index = 0;

        function item() {
            var _curr = { name: "DataService item[" + _index + "]", data: [], window: [], indexes: {start: 0, end: 0, max: 0}, winLength: 20 };
            var _wndw = [];
            function _setIndexes(startIndex) {
                if (startIndex != undefined) {
                    _curr.indexes.start = startIndex;
                    if (_curr.indexes.start < 0) {
                        _curr.indexes.start = 0;
                    }
                }
                if (_curr.indexes.start > _curr.indexes.max) {
                    _curr.indexes.start = _curr.indexes.max;
                }

                _curr.indexes.end = _curr.indexes.start + _curr.winLength;
                if (_curr.indexes.end > _curr.indexes.max) {
                    _curr.indexes.end = _curr.indexes.max;
                }
                var _w = [];
                for (var i = _curr.indexes.start; i <= _curr.indexes.end; i++) {
                    _w.push(_curr.data[i]);
                }
                _curr.window.length = 0;
                _wndw = _w;

            }


            _index++;
            return {
                name: _curr.name,
                setData: function (data) {
                    if (data) {
                        _curr.data = data;
                        _curr.indexes.max = _curr.data.length - 1;
                        _setIndexes();
                    }
                },
                setIndex: function (startIndex) {
                    _setIndexes(startIndex);
                },
                get: function () {
                    return _wndw;
                },
                up: function () {
                    _setIndexes(_curr.indexes.start + 1);
                },
                down: function () {
                    _setIndexes(_curr.indexes.start - 1);
                },
                getIndex: function () {
                    return _curr.indexes;
                }
            }
        }

        this.name = "DataService";
        this.New = function () {
            return item();
        };
    }

    angular.module('app').service('DataService', fn);

})();