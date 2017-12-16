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

    // кроссбраузерный добавлятель обработчиков события "wheel" (колесо мышки)
    function addMouseWheelEvent(  
        elem       // елемент DOM
        , onWheel  // функция обработчик события
    ) {
        if (elem.addEventListener) {
            if ('onwheel' in document) {
                // IE9+, FF17+, Ch31+
                elem.addEventListener("wheel", onWheel);
            } else if ('onmousewheel' in document) {
                // устаревший вариант события
                elem.addEventListener("mousewheel", onWheel);
            } else {
                // Firefox < 17
                elem.addEventListener("MozMousePixelScroll", onWheel);
            }
        } else { // IE8-
            elem.attachEvent("onmousewheel", onWheel);
        }

    }

    var _stat = newStat();

    // контроллер директивы
    function _controller($scope, DataService) {

        var self = this;
        self.ds = DataService.New();
        self.liStyle = {};
        self.debug = {};
        self.isDebugMode = false;

    }

    function fn($compile, $timeout) {

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
                    slider: element.find(".virtual-scroll-slider"),
                    listBox: element.find(".virtual-scroll-list-box")
                },

             

                flags: { isScroll: { slow: false, fast: false } },

                timer: null,

                lineHeight: 20,

                visibleLineHeight: 20,

                isDebugMode: false
            };


            function _setScroll() {
                var indexes = controller.ds.getIndex();
                var h = indexes.start * _curr.lineHeight;
                _curr.flags.isScroll.slow = true;
                _curr.elements.scroll.get(0).scrollTop = h;
            }

            function _setLineHeight(dataLength) {
                var calcLineHeight = _curr.visibleLineHeight;
                //var liArray = element.find(".virtual-scroll-list-box li");
                //if (liArray && liArray.length > 0) {
                //    calcLineHeight = $(liArray[0]).height();
                //}
                if (dataLength && dataLength > 0) {
                    var sh = dataLength * calcLineHeight;
                    if (sh > 500000) {
                        calcLineHeight = 500000 / dataLength;
                    }
                }
                _curr.lineHeight = calcLineHeight;
            }


            _curr.ngRepeat = attrs.virtualScroll.replace(_curr.dataSourceName, "virtualScrollDirectiveController.ds.get()");

            scope.$watch(_curr.dataSourceName, function (nwv, ldv) {
                console.log("$watch '" + _curr.dataSourceName + "' length = ", nwv.length);
                controller.ds.setData(nwv);
                $timeout(function () {
                    _setLineHeight(nwv.length);
                    _curr.elements.slider.height(nwv.length * _curr.lineHeight);
                    _setScroll()
                }, 0);

            });

            scope.$watch(attrs.lineHeight, function (nv, ov) {
                //console.log("$watch attrs.lineHeight", nv, ov);
                if (nv && nv != undefined) {
                    _curr.visibleLineHeight = nv - 0;
                    controller.liStyle = { "height": _curr.visibleLineHeight + "px"};
                }
            });

            scope.$watch(attrs.debugMode, function (nv, ov) {
                if (nv && nv == "true") {
                    _curr.isDebugMode = true;
                } else {
                    _curr.isDebugMode = false;
                }
                controller.isDebugMode = _curr.isDebugMode;
            });


            transclude(scope, function (clone, scp) {
                _curr.trnscld = concatTransEl(clone);
            });

            var transcludeElem = angular.element('<ul ng-style="virtualScrollDirectiveController.ulStyle"><li ng-style="virtualScrollDirectiveController.liStyle" ng-repeat="' + _curr.ngRepeat + '">' + _curr.trnscld + '</li></ul>');

            var compileFn = $compile(transcludeElem);
            compileFn(scope);
            element.find(".virtual-scroll-list-box").append(transcludeElem);

            element.find(".virtual-scroll-scroll").on("scroll", function (event) {
                if (!_curr.flags.isScroll.slow) {

                    if (_curr.timer) {
                        $timeout.cancel(_curr.timer);
                    }

                    _curr.timer = $timeout(function () {
                        var scroll = event.target.scrollTop;
                        var indexes = controller.ds.getIndex();
                        //var k = scroll / _curr.elements.slider.height();
                        var index = Math.round(scroll / _curr.lineHeight);
                        controller.ds.setIndex(index);
                        controller.debug.calcIndex = index;
                        controller.debug.fastScroll = scroll;
                        controller.debug.sliderH = _curr.elements.slider.height();
                        controller.debug.scrollH = _curr.elements.scroll.height();
                        scope.$apply();
                    }, 5);

                }

                _curr.flags.isScroll.slow = false;
            });

            addWheelListener(element.find(".virtual-scroll-list-box").get(0), function (e) {

                //var isEoriginalEvent = false;
                //var isEpreventDefault = false;
                //var isEstopPropagation = false;
                //var isEoriginalEventStopPropagation = false;
                //var isEoriginalEventPreventDefault = false;


                //if (e.originalEvent) {
                //    isEoriginalEvent = e.originalEvent;
                //    e.originalEvent.returnValue = false;
                //    if (e.originalEvent.stopPropagation) {
                //        isEoriginalEventStopPropagation = true;
                //    }
                //    if (e.originalEvent.preventDefault) {
                //        isEoriginalEventPreventDefault = e.originalEvent.preventDefault;
                //    }
                //}

                

                //if (e.preventDefault) {
                //    isEpreventDefault = true;
                //}

                

                //if (e.stopPropagation) {
                //    isEstopPropagation = true;
                //}

                



                //console.log(
                //    "isEoriginalEvent=", isEoriginalEvent,
                //    " isEpreventDefault=", isEpreventDefault,
                //    " isEstopPropagation=", isEstopPropagation,
                //    " isEoriginalEventStopPropagation = ", isEoriginalEventStopPropagation,
                //    " isEoriginalEventPreventDefault=", isEoriginalEventPreventDefault
                //);

                e.preventDefault();

                if (e.stopPropagation) {
                    e.stopPropagation(); // firefox
                } else {
                    if (e.originalEvent) {
                        if (e.originalEvent.stopPropagation) {
                            e.originalEvent.stopPropagation(); // IE
                        }
                        if (e.originalEvent.preventDefault) {
                            e.originalEvent.preventDefault();
                        }
                    } else {
                        e.originalEvent.returnValue = false;  // IE8
                    }
                }

                var delta = e.deltaY;

                //console.log("addWheelListener", delta, new Date());
                
                if (delta > 0) {
                    controller.ds.up();
                    controller.ds.up();
                    controller.debug.index = controller.ds.getIndex();
                    _setScroll();
                    scope.$apply();                  
                }
                if (delta < 0) {
                    controller.ds.down();
                    controller.ds.down();
                    controller.debug.index = controller.ds.getIndex();
                    _setScroll();
                    scope.$apply();
                }
                return null;
            });

            var sl = $("#virtualScrollDirectiveStyleLink");
            var l = '<link id="virtualScrollDirectiveStyleLink" href="app/Directives/VirtualScroll/virtualScrollDirective.css" rel="stylesheet" />';
            if (sl.length < 1) {
                $("head").append(l);
            }
            
            



        }

        return {
            transclude: true,
            templateUrl: "app/Directives/VirtualScroll/virtualScrollDirective.html?t=1",
            link: link,
            controller: _controller, //'VirtualScrollCtrl',
            controllerAs: 'virtualScrollDirectiveController'
        };
    }

    angular.module('app').directive('virtualScroll', ['$compile', "$timeout", "DataService", fn]);

})();