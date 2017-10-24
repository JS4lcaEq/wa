(function () {
    var _servicesFn = {};
    var _servicesItems = {};
    var _injections = {};
    window.app = { "_servicesFn": {}, "_servicesItems": {} };
    window.app.services = function (name, fn, injections) {
        if (fn) {
            if (_servicesFn[name]) {
                console.log("App error: creating service '" + name + "' is exists, already!!!");
            }
            _servicesFn[name] = fn;
            if (injections) {
                _injections[name] = injections;
            }
            return window.app;
        } else {
            if (!_servicesFn[name]) {
                console.log("App error: call undefined service '" + name + "'!!!");
                return null;
            }
            if (!_servicesItems[name]) {
                var injections = {}
                if (_injections[name]) {
                    for (var i = 0; i < _injections[name].length; i++) {
                        var injectionName = _injections[name][i];
                        var injection = window.app.services(injectionName);
                        if (injection) {
                            injections[injectionName] = injection;
                        }
                        
                    }
                }
                _servicesItems[name] = (_servicesFn[name])(injections);
            }
            return _servicesItems[name];
        }
    };

})();