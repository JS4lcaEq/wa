(function () {

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

    // контроллер директивы
    function _controller($scope, $timeout, DataService) {

        var _c = { timer: null, elements: {directive: null, listBox: null, ul: null, up: null, down: null}, height: 0, sliderHeight:0};

        var self = this;

        self.win = DataService.New();

        self.setSliderHeight = function (h) {
            _c.sliderHeight = h;
            var scroll = _c.elements.listBox.scrollTop;
            _c.elements.down.height(_c.sliderHeight - scroll);
        };

        self.setElement = function (element) {
            _c.elements.directive = element;
            _c.elements.listBox = element.find(".list-box");
            _c.elements.up = element.find(".list-box .up");
            _c.elements.down = element.find(".list-box .down");
            _c.elements.ul = element.find(".list-box ul");
            _c.height = element.height();
            _c.elements.listBox.height(_c.height);
            _c.elements.down.height(1000);
            _c.elements.listBox.on("scroll", function (e) {
                if (_c.timer) {
                    $timeout.cancel(_c.timer);
                }
                _c.timer = $timeout(function () {
                    $scope.$digest();
                    var scroll = e.target.scrollTop;
                    var index = Math.round(scroll / 30);
                    self.win.setIndex(index);
                    _c.elements.up.height(scroll);
                    _c.elements.down.height(_c.sliderHeight - scroll);
                }, 5);


            });

        };

    }

    function fn($compile, DataService) {

        function link(scope, element, attrs, controller, transclude) {

            var _curr = {
                trnscld: null, // html внутри директивы (transclude), строка  
                dataSourceName: parseStringAttrToScopeDataSourceName(attrs.virtualRepeater), // имя свойства scope содержащего источник данных для repeat, строка
                ngRepeat: null // содержимое ng-repeat компилируемого шаблона, строка 
            };

            var _ds = findObjectProperty(scope, _curr.dataSourceName);

            _curr.ngRepeat = attrs.virtualRepeater.replace(_curr.dataSourceName, "virtualScrollDirectiveController.win.get()");

            controller.ds = _ds;

            //controller.debug = {
            //    "attrs.virtualScroll": attrs.virtualScroll,
            //    "_curr.dataSourceName": _curr.dataSourceName,
            //    "_curr.ngRepeat": _curr.ngRepeat
            //    , "controller.window.getIndex()": controller.window.getIndex()
            //};


            scope.$watch(_curr.dataSourceName, function (nwv, ldv) {
                //console.log("scope.$watch(" + _curr.dataSourceName + ") = ", nwv.length);
                controller.win.setData(nwv);
                controller.setSliderHeight(controller.win.getIndex().max * 30);
            });

            transclude(scope, function (clone, scp) {
                _curr.trnscld = concatTransEl(clone);
            });

            var transcludeElem = angular.element('<div class="up"></div><ul><li ng-style="_cctrl.liStyle" ng-repeat="' + _curr.ngRepeat + '">' + _curr.trnscld + '</li></ul><div class="down"></div>');

            var compileFn = $compile(transcludeElem);
            compileFn(scope);
            element.find(".list-box").append(transcludeElem);
            controller.setElement(element);

        }

        return {
            transclude: true,
            templateUrl: 'virtualRepeaterDirectiveTemplate.html?t=1',
            link: link,
            controller: _controller, //'VirtualScrollCtrl',
            controllerAs: 'virtualScrollDirectiveController'
        };
    }

    angular.module('app').directive('virtualRepeater', ['$compile', 'DataService', fn]);

})();