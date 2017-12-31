(function () {
    
    function fn() {
        var _store = {};
        var _index = 0;
        function _new(name) {
            var _curr = { indexes: {start:0, max: 0, end: 0}, len: 60, src: [], win: [], itemIndex: _index, itemName: name };
            _index++;

            function _render() {
                var ret = [];
                for (var i = _curr.indexes.start; i <= _curr.indexes.end; i++) {
                    ret.push(_curr.src[i]);
                }
                _curr.win = ret;
            }

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
                _render();
            }

            return {

                updated: null,

                SetSrc: function (src) {
                    var self = this;
                    if ($.isArray(src)) {
                        _curr.src = src;
                        _curr.indexes.max = _curr.src.length - 1;
                        _setIndexes();
                        self.updated = new Date();
                    }
                },

                SetLen: function (len) {
                    var self = this;
                    _curr.len = len - 0;
                    _setIndexes();
                    self.updated = new Date();
                },

                SetStartIndex: function (startIndex) {
                    var self = this;
                    _setIndexes(startIndex);
                    self.updated = new Date();
                },

                Up: function () {
                    var self = this;
                    if (_curr.indexes.start < _curr.indexes.max) {
                        _curr.indexes.start++;
                        _setIndexes();
                        self.updated = new Date();
                    }
                },

                Down: function () {
                    var self = this;
                    if (_curr.indexes.start > 0) {
                        _curr.indexes.start--;
                        _setIndexes();
                        self.updated = new Date();
                    }
                },

                Get: function () {
                    return _curr.win;
                },

                GetIndexes: function () {
                    return _curr.indexes;
                },

                Debug: function () {
                    return _curr.indexes;
                }

            };
        }
        return {
            New: function () {
                return _new();
            }
        };

    }

    app.services("WindowService", fn);

})();