(function () {


    function _renderer(branches, branchId, level) {
        if (!branches[branchId]) {
            return null;
        }
        _level = 0;
        if (level) {
            _level = level;
        }
        var _ret = [];
        var cb = branches[branchId];
        for (var i = 0; i < cb.data.length; i++) {
            _ret.push({ meta: { bid: branchId, lvl: _level }, dt: cb.data[i] });
        }
        console.log("_renderer branchId=", branchId, " branch:", cb.data, " _ret:", _ret);
        return _ret;
    }

    function _item(singleBranchLoadUrl, $http) {
        var _r = { name: "TreeService item" };
        var _c = { branches: {}, list: [], state: null, url: "app/Services/treeServiceTestData.json?id=", onLoadedFn: null };
        if (singleBranchLoadUrl) {
            _c.url = singleBranchLoadUrl;
        }

        _r.get = function () {
            _c.list = _renderer(_c.branches, "null", 0);

            return _c.list;
        };
        _r.open = function (branchId) {
            var _branchId = "null";
            if (branchId) {
                _branchId = branchId;
            }
            if (!_c.branches[_branchId]) {
                _r.load(_branchId)
            }
            _c.branches[_branchId].isOpen = true;
        };
        _r.load = function (branchId) {

            _c.branches[branchId] = { data: [], id: branchId, level: 0, isOpen: false, isLoaded: false, loadedStatus: null };
            $http.get(_c.url + branchId).then(
                function (response) {
                    _c.branches[branchId].data = response.data.data;
                    _c.branches[branchId].isLoaded = true;
                    _c.branches[branchId].loadedStatus = response.status;
                    if (_c.onLoadedFn) {
                        _c.onLoadedFn(_c.branches[branchId]);
                    }
                },
                function (response) {
                    _c.branches[branchId].data = [];
                    _c.branches[branchId].isLoaded = false;
                    _c.branches[branchId].loadedStatus = response.status;
                    if (_c.onLoadedFn) {
                        _c.onLoadedFn(_c.branches[branchId]);
                    }
                }

            );

        };

        _r.setOnLoaded = function (fn) {
            _c.onLoadedFn = fn;
        }

        _r.debug = function () {
            return _c;
        };

        return _r;
    }


    /*  */
    function fn($http) {
        var self = this;
        self.name = "TreeService";
        self.New = function (url) {
            return _item(url, $http);
        }
    }

    angular.module('app').service('TreeService', fn);

})();