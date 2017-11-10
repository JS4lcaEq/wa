(function () {
    
    function fn() {
        var _store = {};
        var _index = 0;
        function _new() {
            var _curr = { startIndex: 0, maxIndex: 0, endIndex: 0, len: 60, src: [], itemIndex: _index, itemName: null };
            _index++;
            function _setIndexes() {
                _curr.endIndex = _curr.startIndex + _curr.len;
                if (_curr.endIndex > _curr.maxIndex) {
                    _curr.endIndex = _curr.maxIndex;
                }
                if (_curr.startIndex > _curr.maxIndex) {
                    _curr.startIndex = _curr.maxIndex;
                }
            }

            return {

                SetSrc: function (src) {
                    if ($.isArray(src)) {
                        //_curr.src.length = 0;
                        _curr.src = src;
                        _curr.maxIndex = _curr.src.length - 1;
                        _setIndexes();
                    }

                },

                SetLen: function (len) {
                    _curr.len = len - 0;
                    _setIndexes();
                },

                Up: function () {
                    if (_curr.startIndex < _curr.maxIndex) {
                        _curr.startIndex++;
                        _curr.startIndex++;
                        _curr.startIndex++;
                        _setIndexes();
                        //console.log("WindowService Up()", _curr.startIndex, _curr.endIndex);
                    }

                },

                Down: function () {
                    if (_curr.startIndex > 0) {
                        _curr.startIndex--;
                        _curr.startIndex--;
                        _curr.startIndex--;
                        _setIndexes();
                        //console.log("WindowService Down()", _curr.startIndex, _curr.endIndex);
                    }

                },

                Get: function () {
                    var ret = [];
                    for (var i = _curr.startIndex; i < _curr.endIndex; i++) {
                        ret.push(_curr.src[i]);
                    }
                    return ret;
                },

                Debug: function () {
                    return _curr;
                }

            };
        }
        return {
            New: function () {
                return _new();
            },
            Get: function (name) {
                var _name = "WindowServiceV1" + _store.length;
                if (name) {
                    _name = name;
                }
                if (!_store[_name]) {
                    _store[_name] = _new();
                }
                return _store[_name];
            }
        };

    }

    pplctn.services("WindowServiceV1", fn);

})();