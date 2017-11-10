(function () {

    function fn() {
        var _curr = {startIndex:0, maxIndex: 50, endIndex: 50, len: 50, count: 0};
        return {
            get: function (srcArray, idFieldName) {
                var self = this;
                var index = [];
                for (var i = 0; i < srcArray.length; i++) {
                    index[srcArray[i][idFieldName]] = i;
                }
                return index;
            },
            renderSingleBranchToArray: function (branches, currentBranchId, destinationArray, lvl) {
                var self = this;
                _curr.count++;
                console.log("renderSingleBranchToArray ", _curr.count, " id=", currentBranchId );
                var currentBranch = branches[currentBranchId];
                if (currentBranch && currentBranch.isOpen) {
                    var l = lvl + 1;
                    for (var i = 0; i < currentBranch.items.length; i++) {
                        destinationArray.push({ "mt": {"lvl":l}, "dt": currentBranch.items[i] });
                        if (branches[currentBranch.items[i].id]) {
                            self.renderSingleBranchToArray(branches, currentBranch.items[i].id, destinationArray, l);
                        }
                    
                    }
                }
            },
            window: function (inputArray) {
                if ($.isArray(inputArray)) {
                    var len = 50;
                    if (inputArray.length < len) {
                        len = inputArray.length;
                    }
                    var ret = [];
                    for (var i = 0; i < len; i++) {
                        ret.push(inputArray[i]);
                    }
                    return ret;
                }
                return null;
            }
        };

    }

    pplctn.services("IndexService", fn);

})();