(function () {
    var _servicesFn = {};
    var _servicesItems = {};
    var _injections = {};
    if (!window.app) {
        window.app = {};
    }
    if (!window.app.services) {
        window.app.services = function (name, fn, injections) {
            if (fn) {
                if (_servicesFn[name]) {
                    console.log("App error: creating service '" + name + "' is exists, already!!!");
                    throw new Error("App error: creating service '" + name + "' is exists, already!!!");
                    return null;
                }
                _servicesFn[name] = fn;
                if (injections) {
                    _injections[name] = injections;
                }
                return window.app;
            } else {
                if (!_servicesFn[name]) {
                    console.log("App error: call undefined service '" + name + "'!!!");
                    throw new Error("App error: call undefined service '" + name + "'!!!");
                    return null;
                }
                if (!_servicesItems[name]) {
                    var args = [];
                    if (_injections[name]) {
                        for (var i = 0; i < _injections[name].length; i++) {
                            var injectionName = _injections[name][i];
                            var injection = window.app.services(injectionName);
                            if (injection) {
                                args.push(injection);
                            }

                        }
                    }
                    _servicesItems[name] = _servicesFn[name].apply({}, args);
                }
                return _servicesItems[name];
            }
        }
    }



})();