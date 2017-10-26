(function () {
    function translate(inp) {
        if (inp) {
            return inp;
        }
        return "null";
    }

    function fn(injections) {

        var _items = null;
        var _window = null;
        var _onLoad = null;
        var _branches = {};
        var url = "";


        function _render() {
            _items.length = 0;
            injections["IndexService"].renderSingleBranchToArray(_branches, "null", _items, 0);
            _window = injections["IndexService"].window(_items);
            if (_onLoad) {
                _onLoad(_window);
            }
        }

        function _load(idp) {
            if (!_branches[idp]) {
                $.get("/api/Vue" 
                    + "/" + translate(idp)
                    + "?t=" + Math.random()
                ).done(function (data) {
                    if (!_items || !$.isArray(_items)) {
                        _items = [];
                    }
                    _branches[idp] = { "items": data.data, "isOpen": true };
                    _render();
                });
            }
        }

        return {

            get: function () {
                var self = this;
                if (!_items) {
                    _items = "load..."
                    self.trigger("null");
                }
                return _window;
            },
            trigger: function (idp) {
                var self = this;
                if (_branches[idp]) {
                    _branches[idp].isOpen = !_branches[idp].isOpen;

                    _render();

                } else {
                    _load(idp);
                }
            },
            setOnLoadFunction: function (onLoadFunction) {
                _onLoad = onLoadFunction;
            }
        };

    }

    app.services("TreeService", fn, ["IndexService"]);

})();