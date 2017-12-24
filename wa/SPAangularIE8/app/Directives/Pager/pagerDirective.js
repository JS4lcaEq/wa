(function () {

    function fn($timeout) {

        function link(scope, element, attrs) {

            scope.pages = [];
            scope.currentPage = 0;

            var _curr = {
                maxPage: 0,     // максимальный index страницы
                pageLength: 20, // записей на страницу
                pageCount: 0,   // количество страниц
                dataLength: 0,  // всего записей
                currentPage: 0, // текущая страница
                pageData: [],   // данные страницы
                indexes: { start: 0, end: 0, max: 0 },
                pageIndexes: { start: 0, end: 0 },
                pageRange: 4
            };

            function _setPageData() {

                //console.log("scope.pageData", scope.pageData);
                var pd = [];
                for (var i = _curr.indexes.start; i <= _curr.indexes.end; i++) {
                    pd.push(scope.inpData[i]);
                }
                scope.pageData = pd;

            }

            function _setPages() {
                var p = [];
                for (var i = _curr.pageIndexes.start; i <= _curr.pageIndexes.end; i++){
                    p.push(i);
                }
                scope.pages = p;
            }

            function _calc() {
                _curr.indexes.max = _curr.dataLength - 1;
                _curr.pageCount = Math.ceil(_curr.dataLength / _curr.pageLength);
                _curr.maxPage = _curr.pageCount - 1;

                if (_curr.currentPage > _curr.maxPage) {
                    _curr.currentPage = _curr.maxPage;
                }

                scope.currentPage = _curr.currentPage;

                _curr.pageIndexes.start = _curr.currentPage - _curr.pageRange;
                if (_curr.pageIndexes.start < 0) {
                    _curr.pageIndexes.start = 0;
                }

                _curr.pageIndexes.end = _curr.currentPage + _curr.pageRange;
                if (_curr.pageIndexes.end > _curr.maxPage) {
                    _curr.pageIndexes.end = _curr.maxPage;
                }

                _setPages();

                scope.selectedPage = _curr.currentPage;

                _curr.indexes.start = _curr.pageLength * _curr.currentPage;
                _curr.indexes.end = _curr.indexes.start + _curr.pageLength;
                if (_curr.indexes.end > _curr.indexes.max) {
                    _curr.indexes.end = _curr.indexes.max;
                }
                _setPageData();
                console.log("_curr", _curr);
            }

            scope.$watch("inpData", function (data) {
                if (angular.isArray(data)) {
                    _curr.dataLength = data.length;
                } else {
                    _curr.dataLength = 0;
                }
                _calc();
            });

            scope.$watch("selectedPage", function (data) {
                if (angular.isNumber(data)) {
                    _curr.currentPage = data;
                    _calc();
                }
            });

            scope.$watch("pageLength", function (data) {
                
                if (angular.isNumber(data - 0)) {
                    console.log("pageLength", data);
                    _curr.pageLength = data;
                    _calc();
                }
            });

            scope.onSelectPage = function (page) {
                _curr.currentPage = page;
                _calc();
            };

            scope.onSelectedMinPage = function () {
                _curr.currentPage = 0;
                _calc();
            };

            scope.onSelectedMaxPage = function () {
                _curr.currentPage = _curr.maxPage;
                _calc();
            };

            scope.onSelectedDecrementPage = function () {
                if (_curr.currentPage > 0) {
                    _curr.currentPage--;
                    _calc();
                }
            };

            scope.onSelectedIncrementPage = function () {
                if (_curr.currentPage < _curr.maxPage) {
                    _curr.currentPage++;
                    _calc();
                }
            };

        }

        return {
            templateUrl: "app/Directives/Pager/pagerDirective.html?t=1",
            link: link,
            scope: {
                inpData: "=",
                pageData: "=?",
                selectedPage: "=?",
                pageLength: "=?"
            }
        };
    }

    angular.module('app').directive('pagerDirective', [fn]);

})();