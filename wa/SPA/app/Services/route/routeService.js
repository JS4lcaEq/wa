(function () {

    
    function _fn(routesUrl) {

        var _c = { current: { hash: window.location.hash, component: null }, routesUrl: "", onChangeFunction: null, routes: [{ hashMask: "", component: "home" }]};

        if (routesUrl) {
            _c.routesUrl = routesUrl;
            _onChangeRoutesUrl();
            //_onChange();
        }

        function _onChange() {
            _c.current.hash = window.location.hash;
            if (_c.onChangeFunction) {
                _c.onChangeFunction(_c);
            }
        }

        function _onChangeRoutesUrl() {

            $.getJSON(_c.routesUrl)
                .done(function (data) {
                    _c.routes = data.data;
                    console.log("second success");
                })
                .fail(function () {
                    throw new Error("RouteService: ERROR while loading routes from url: '" + _c.routesUrl + "'");
                })
                .always(function () {
                    console.log("complete");
                });
            //$.ajax(
            //    {
            //        url: _c.routesUrl,
            //        async: true,
            //        dataType: "json",
            //        success: function (data) {
            //            _c.routes = data.data;
            //            _onChange();
            //        },
            //        error: function (jqXHR, textStatus, errorThrown) {
            //            throw new Error("RouteService: " + textStatus + " while loading routes from url: '" + _c.routesUrl + "'");
            //        }
            //    }
            //);
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