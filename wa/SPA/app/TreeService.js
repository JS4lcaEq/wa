(function () {
    function translate(inp) {
        if (inp) {
            return inp;
        }
        return "null";
    }

    function fn(IndexService) {

        var _curr = { items: null, window: null, onLoad: null, branches: {}, isBussy: false};
        var _onLoad = null;

        function _render() {
            _curr.items.length = 0;
            IndexService.renderSingleBranchToArray(_curr.branches, "null", _curr.items, 0);
            if (_onLoad && _onLoad != undefined && $.isFunction(_onLoad)) {
                _onLoad(_curr.items);
            }
        }

        function _load(idp) {
            if (!_curr.branches[idp]) {
                _curr.isBussy = true;
                $.get("/api/Vue" 
                    + "/" + translate(idp)
                    + "?t=" + Math.random()
                ).done(function (data) {
                    if (!_curr.items || !$.isArray(_curr.items)) {
                        _curr.items = [];
                    }
                    _curr.branches[idp] = { "items": data.data, "isOpen": true };
                    _render();
                    _curr.isBussy = false;
                });
            }
        }

        return {

            get: function () {
                var self = this;
                if (!_curr.items) {
                    _curr.items = [];
                    self.trigger("null");
                }
                return _curr.items;
            },

            trigger: function (idp) {
                var self = this;
                if (_curr.branches[idp]) {
                    _curr.branches[idp].isOpen = !_curr.branches[idp].isOpen;

                    _render();

                } else {
                    _load(idp);
                }
            },

            setOnLoadFunction: function (onLoadFunction) {
                _onLoad = onLoadFunction;
            },

            Debug: function () {
                return _curr;
            },

            GetBussy: function () {
                return _curr.isBussy;
            },

            isBussy: false
        };

    }

    pplctn.services("TreeService", fn, ["IndexService"]);

})();