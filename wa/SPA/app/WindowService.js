(function () {
    
    function fn() {
        var _store = {};
        var _index = 0;
        function _new(name) {
            var _curr = { indexes: {start:0, max: 0, end: 0}, len: 60, src: [], itemIndex: _index, itemName: name };
            _index++;
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
                _curr.indexes.end = _curr.indexes.start + _curr.len;
                if (_curr.indexes.end > _curr.indexes.max) {
                    _curr.indexes.end = _curr.indexes.max;
                }
            }

            return {

                SetSrc: function (src) {
                    if ($.isArray(src)) {
                        //_curr.src.length = 0;
                        _curr.src = src;
                        _curr.indexes.max = _curr.src.length - 1;
                        _setIndexes();
                    }

                },

                SetLen: function (len) {
                    _curr.len = len - 0;
                    _setIndexes();
                },

                SetStartIndex: function (startIndex) {
                    _setIndexes(startIndex);
                },

                Up: function () {
                    if (_curr.indexes.start < _curr.indexes.max) {
                        _curr.indexes.start++;
                        //_curr.indexes.start++;
                        //_curr.indexes.start++;
                        _setIndexes();
                        //console.log("WindowService Up()", _curr.indexes.start, _curr.indexes.end);
                    }

                },

                Down: function () {
                    if (_curr.indexes.start > 0) {
                        _curr.indexes.start--;
                        //_curr.indexes.start--;
                        //_curr.indexes.start--;
                        _setIndexes();
                        //console.log("WindowService Down()", _curr.indexes.start, _curr.indexes.end);
                    }

                },

                Get: function () {
                    var ret = [];
                    for (var i = _curr.indexes.start; i < _curr.indexes.end; i++) {
                        ret.push(_curr.src[i]);
                    }
                    return ret;
                },

                Debug: function () {
                    return _curr.indexes;
                }

            };
        }
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
                    _store[_name] = _new(_name);
                }
                return _store[_name];
            }
        };

    }

    pplctn.services("WindowService", fn);

})();