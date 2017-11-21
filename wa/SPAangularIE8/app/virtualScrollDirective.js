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

        var _ds = DataService.New();


        var self = this;
        var _curr = {prevScroll:0, len: 50, liHeight: 30, controlHeight: 100, sliderHeight: 3, visibleLiCount: 0, element: null, elements: { scroll: null, slider: null, listBox: null }, timer: null, isScroll: false  };

        function _setSliderHeight() {
            _curr.visibleLiCount = _curr.controlHeight / _curr.liHeight;
            _curr.sliderHeight = _ds.getIndex().max / _curr.visibleLiCount;
            self.sliderStyle.height = _ds.getIndex().max * _curr.liHeight + "px";
        }

        function _setScrollScroll() {
            var scroll = (_ds.getIndex().start / _ds.getIndex().max) * _curr.sliderHeight * _curr.controlHeight;
            //console.log("_setScrollScroll scroll = ", scroll, " element = ", _curr.elements.scroll.get(0).scrollTop);
            _curr.elements.scroll.get(0).scrollTop = scroll;
        }


        self.liStyle = { "height": _curr.liHeight + "px" };

        self.sliderStyle = { "height": 100 * _curr.sliderHeight + "%" };

        self.setLiHeight = function (height) {
            _curr.liHeight = height;
            self.liStyle.height = _curr.liHeight + "px";
            _setSliderHeight();
        };
           
        self.setElement = function (element) {
            _curr.element = element
            _curr.controlHeight = element.height();
            _curr.elements.scroll = element.find(".virtual-scroll-scroll");
            _curr.elements.slider = element.find(".virtual-scroll-slider");
            _curr.elements.listBox = element.find(".virtual-scroll-list-box");
            _curr.elements.listBox.height(_curr.controlHeight);
            _curr.elements.scroll.height(_curr.controlHeight);
            _curr.elements.listBox.on("scroll", function (event) {
                
                var _scroll = event.target.scrollTop;
                //console.log("scroll", _scroll);
                if (_scroll > 30) {
                    _curr.isScroll = true;
                    $scope.$digest();
                    if (_ds.getIndex().start < (_ds.getIndex().max - 6)) {
                        event.target.scrollTop = 30;
                        _ds.up();
                        
                        _setScrollScroll();
                    }
                }
                if (_scroll < 30) {
                    _curr.isScroll = true;
                    _ds.down();
                    
                    _setScrollScroll();
                    $scope.$digest();
                    if (_ds.getIndex().start > 0) {
                        event.target.scrollTop = 30;
                    }
                }
            });
            _curr.elements.scroll.on("scroll", function (event) {
                if (!_curr.isScroll) {


                    if (_curr.timer) {
                        $timeout.cancel(_curr.timer);
                    }
                    
                    _curr.timer = $timeout(function () {
                        var _scroll = event.target.scrollTop;
                        var index = Math.round(_scroll / _curr.liHeight);
                        _ds.setIndex(index);
                        $scope.$digest();
                        //console.log("_curr.elements.scroll.on(scroll) index=", index);
                    }, 8);
 
                }

                _curr.isScroll = false;
            });
        };

        self.window = {
            get: function () { return _ds.get(); },
            setData: function (data) {
                _ds.setData(data);
                _setSliderHeight();
                _setScrollScroll();
            },
            getIndex: function () {
                return _ds.getIndex();
            }
        };

    }

    function fn($compile, DataService) {



        function link(scope, element, attrs, controller, transclude) {

            var _curr = {
                trnscld: null, // html внутри директивы (transclude), строка  
                dataSourceName: parseStringAttrToScopeDataSourceName(attrs.virtualScroll), // имя свойства scope содержащего источник данных для repeat, строка
                ngRepeat: null // содержимое ng-repeat компилируемого шаблона, строка 
            };

            var _ds = findObjectProperty(scope, _curr.dataSourceName);

            _curr.ngRepeat = attrs.virtualScroll.replace(_curr.dataSourceName, "_cctrl.window.get()");

            controller.ds = _ds;

            //controller.debug = {
            //    "attrs.virtualScroll": attrs.virtualScroll,
            //    "_curr.dataSourceName": _curr.dataSourceName,
            //    "_curr.ngRepeat": _curr.ngRepeat
            //    , "controller.window.getIndex()": controller.window.getIndex()
            //};


            scope.$watch(_curr.dataSourceName, function (nwv, ldv) {
                //console.log("scope.$watch(" + _curr.dataSourceName + ") = ", nwv.length);
                controller.window.setData(nwv);
            });

            transclude(scope, function (clone, scp) {
                _curr.trnscld = concatTransEl(clone);
            });

            var transcludeElem = angular.element('<ul><li ng-style="_cctrl.liStyle" ng-repeat="' + _curr.ngRepeat + '">' + _curr.trnscld + '</li></ul>');

            var compileFn = $compile(transcludeElem);
            compileFn(scope);
            element.find(".virtual-scroll-list-box").append(transcludeElem);
            controller.setElement(element);

        }

        return {
            transclude: true,
            templateUrl: 'virtualScrollDirectiveTemplate.html?t=1',
            link: link,
            controller: _controller, //'VirtualScrollCtrl',
            controllerAs: '_cctrl'
        };
    }

    angular.module('app').directive('virtualScroll', ['$compile', 'DataService', fn]);

})();