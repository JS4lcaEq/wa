(function () {
    // new

    // собирает шаблон из вложенных в директиву узлов DOM
    function concatTransEl(elements) {
        var tmpl = "";
        for (var i = 0; i < elements.length; i++) {
            if (elements[i].outerHTML && elements[i].outerHTML != undefined) {
                tmpl += elements[i].outerHTML;
            }
        }
        return tmpl;
    }

    function _parseStringNameToNamesArray(name) {
        var names = [];
        if (name) {
            names = name.split(".");
        }
        return names;
    }

    // рекурсивно ищет свойство объекта obj по массиву имен свойств propertyNamesArray
    function _findObjectProperty(obj, propertyNamesArray, propertyNamesArrayIndex) {
        console.log("findObjectProperty ", obj, propertyNamesArray, propertyNamesArrayIndex);
        if (propertyNamesArray && $.isArray(propertyNamesArray)) {
            var _propertyNamesArrayIndex = 0;
            if (propertyNamesArrayIndex) {
                _propertyNamesArrayIndex = propertyNamesArrayIndex;
            }
            var _obj = obj[propertyNamesArray[_propertyNamesArrayIndex]];
            if (propertyNamesArray.length == propertyNamesArrayIndex + 1) {
                return _obj;
            } else {
                return _findObjectProperty(_obj, propertyNamesArray, _propertyNamesArrayIndex + 1);
            }
        }
        return obj;
    }

    // рекурсивно ищет свойство объекта obj имени свойства propertyName 
    // например если obj = scope а propertyName = "ctrl.data" то найдет scope.ctrl.data
    function findObjectProperty(obj, propertyName) {
        return _findObjectProperty(obj, _parseStringNameToNamesArray(propertyName));
    }

    // получает имя источника данных из аттрибута 
    // "item in ctrl.dataSource" ==> "ctrl.dataSource"
    function parseStringAttrToScopeDataSourceName(attr) {
        var name = null;
        if (attr && attr.length > 0) {
            var matches = attr.match(/in (\[.*\]|\S*)/i);
            if (matches && matches[1]) {
                name = matches[1];
            }
        }
        return name;
    }

    // копит статистику повторений значений 
    function newStat() {
        var data = {};
        var item = {};
        item.add = function (val) { // добавить значение
            if (!data[val]) {
                data[val] = 0;
            }
            data[val]++;
        };
        item.get = function () { // получить статистику
            return data;
        };
        return item;
    }

    var _stat = newStat();

    // контроллер директивы
    function _controller($scope, $timeout, DataService) {

        var self = this;
        self.ds = DataService.New();
        self.liStyle = { "height": "30px" };

    }

    function fn($compile) {

        function link(scope, element, attrs, controller, transclude) {

            var _curr = {

                // html внутри директивы (transclude), строка
                trnscld: null,

                // имя свойства scope содержащего источник данных для repeat, строка
                dataSourceName: parseStringAttrToScopeDataSourceName(attrs.virtualScroll),

                // источник данных
                dataSource: findObjectProperty(scope, parseStringAttrToScopeDataSourceName(attrs.virtualScroll)),

                // содержимое ng-repeat компилируемого шаблона, строка 
                ngRepeat: null,

                elements: {
                    scroll: element.find(".virtual-scroll-scroll"),
                    listBox: element.find(".virtual-scroll-list-box")
                }
            };

            function _setHeight() {
                var height = element.height();
                _curr.elements.scroll.height(height);
                _curr.elements.listBox.height(height);
            }

            //_setHeight();

            _curr.ngRepeat = attrs.virtualScroll.replace(_curr.dataSourceName, "virtualScrollDirectiveController.ds.get()");

            scope.$watch(_curr.dataSourceName, function (nwv, ldv) {
                console.log("$watch '" + _curr.dataSourceName + "' length = ", nwv.length);
            });

            scope.$watch(_curr.dataSource, function () {
                console.log(" $watch dataSource !!!");
                controller.ds.setData(_curr.dataSource);
            });

            transclude(scope, function (clone, scp) {
                _curr.trnscld = concatTransEl(clone);
            });

            var transcludeElem = angular.element('<ul ng-style="virtualScrollDirectiveController.ulStyle"><li ng-style="virtualScrollDirectiveController.liStyle" ng-repeat="' + _curr.ngRepeat + '">' + _curr.trnscld + '</li></ul>');

            var compileFn = $compile(transcludeElem);
            compileFn(scope);
            element.find(".virtual-scroll-list-box").append(transcludeElem);

            element.find(".virtual-scroll-list-box").on('scroll', function (event) {
                var _scroll = event.target.scrollTop - 100;
                
                if (event.target.scrollTop > 100) {
                    controller.debug = _scroll;
                    if (_scroll < 10) {
                        controller.ds.up();
                        controller.ds.up();
                        event.target.scrollTop = 100;
                        controller.liStyle.height = 25 + "px";
                    } else if (_scroll < 20) {
                        controller.ds.up();
                        event.target.scrollTop = 100;
                        controller.liStyle.height = 20 + "px";
                    } else if (_scroll < 40) {
                        controller.ds.up();
                        controller.ds.up();
                        event.target.scrollTop = 100;
                        controller.liStyle.height = _scroll + "px";
                    } else if (_scroll < 60) {
                        controller.ds.up();
                        controller.ds.up();
                        event.target.scrollTop = 100;
                        controller.liStyle.height = _scroll / 2 + "px";
                    } else {
                        controller.ds.up();
                        controller.ds.up();
                        event.target.scrollTop = 100;
                        controller.liStyle.height = _scroll / 3 + "px";
                    }
                    scope.$apply();
                }
                if (event.target.scrollTop < 100) {

                    controller.debug = _scroll;
                    //controller.ds.down();
                    //event.target.scrollTop = 100;

                    //controller.debug = _scroll;
                    if (_scroll > -60) {
                        controller.ds.down();
                        controller.ds.down();
                        event.target.scrollTop = 100;
                        controller.liStyle.height = _scroll / 3 + "px";
                    } 
                    else if (_scroll > -40) {
                        controller.ds.down();
                        controller.ds.down();
                        event.target.scrollTop = 100;
                        controller.liStyle.height = _scroll + "px";
                    } 
                    //else if (_scroll > -60) {
                    //    controller.ds.up();
                    //    controller.ds.up();
                    //    event.target.scrollTop = 100;
                    //    controller.liStyle.height = _scroll / 2 + "px";
                    //} 
                    //else {
                    //    controller.ds.up();
                    //    controller.ds.up();
                    //    event.target.scrollTop = 100;
                    //    controller.liStyle.height = _scroll / 3 + "px";
                    //}

                    scope.$apply();
                }
                
            });
            element.find(".virtual-scroll-list-box").get(0).scrollTop = 100;
        }

        return {
            transclude: true,
            templateUrl: "app/Directives/VirtualScroll/virtualScrollDirective.html?t=1",
            link: link,
            controller: _controller, //'VirtualScrollCtrl',
            controllerAs: 'virtualScrollDirectiveController'
        };
    }

    angular.module('app').directive('virtualScroll', ['$compile', "DataService", fn]);

})();