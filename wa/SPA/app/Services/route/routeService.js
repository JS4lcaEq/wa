(function () {

    
    function _fn(routesUrl) {

        if (!routesUrl) {
            throw new Error("RouteService: ERROR NOT SET first parametr 'routesUrl' in constructor RouteService.New(routesUrl) ");
        }
        

        var _c = { current: { hash: window.location.hash, route: null }, routesUrl: routesUrl, onChangeFunction: null, routes: null};

        if (routesUrl) {
            _c.routesUrl = routesUrl;
            _onChangeRoutesUrl();
            _onChange();
        }


        function _setRoutesRegExp() {
            if (_c.routes && $.isArray(_c.routes)) {
                for (var i = 0; i < _c.routes.length; i++) {
                    var item = _c.routes[i];
                    if (item.hashMask && $.type(item.hashMask) === "string") {
                        item.regExp = new RegExp(item.hashMask, 'i');
                    }
                }
            }
        }

        function _findCurrentRoute() {
            if (_c.routes && $.isArray(_c.routes)) {
                for (var i = 0; i < _c.routes.length; i++) {
                    var item = _c.routes[i];
                    if (item.regExp.test(_c.current.hash)) {
                        _c.current.route = item;
                        return true;
                    }
                }
            }
            return false;
        }

        function _onChange() {
            _c.current.hash = window.location.hash;
            if (_c.current.hash == "" || _c.current.hash == "#") {
                window.location.hash = "#default";
                return;
            }
            _findCurrentRoute();
            if (_c.onChangeFunction) {
                _c.onChangeFunction(_c);
            }
        }

        function _onChangeRoutesUrl() {

            $.getJSON(_c.routesUrl)
                .done(function (data) {
                    _c.routes = data.data;
                    _setRoutesRegExp();
                    //console.log("second success");
                })
                .fail(function () {
                    throw new Error("RouteService: ERROR while loading routes from url: '" + _c.routesUrl + "'");
                })
                .always(function () {
                    //console.log("complete");
                });
         }


        var ret = {};

        ret.get = function () {
            return _c;
        };

        ret.setOnChange = function (onChangeFunction) {
            _c.onChangeFunction = onChangeFunction;
            _onChange();
        };

        ret.setRoutesUrl = function (routesUrl) {
            _c.routesUrl = routesUrl;
            _onChange();
        }

        $(window).on("hashchange", function () {
            _onChange();
        });

        return ret;

    }

    function fn() {
        return {
            New: function (routesUrl) {
                return _fn(routesUrl);
            }
        };
    }

    app.services("RouteService", fn);

})();