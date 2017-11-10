(function () {

    /*  */
    function fn() {
        var _options = { GenerateTestBranchLen: 1000 };
        var _curr = { data: [], branches: {}, id: 0, onChange: null }
        this.name = 'Tree1Service';
        this.isBussy = false;
        this.Get = function () { return _curr.branches; };
        this.LoadBranch = function (idp) { };
        this.GenerateTestBranch = function (idp, len) {
            var self = this;
            if (!_curr.branches[idp]) {
                var _len = _options.GenerateTestBranchLen;
                if (len) {
                    _len = len;
                }
                self.isBussy = true;
                setTimeout(function () {
                    _curr.branches[idp] = [];
                    for (var i = 0; i < _len; i++) {
                        _curr.id++;
                        _curr.branches[idp].push({ id: _curr.id, idp: idp });
                    }
                    self.isBussy = false;
                    if (_curr.onChange) {
                        _curr.onChange(_curr.branches);
                    }
                }, 900);
            }
        };
        this.setOnChange = function (onChangeFn) {
            _curr.onChange = onChangeFn;
        };
        this.setUrl = function () { };

    }

    angular.module('app').service('Tree1Service', fn);

})();