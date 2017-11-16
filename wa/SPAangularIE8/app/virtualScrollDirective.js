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
    // например obj = scope а propertyName = "ctrl.data";
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

    function fn($compile, VirtualScrollService) {

        function link(scope, element, attrs, controller, transclude) {

            //console.log(scope, element, attrs, controller);
            var _curr = { trnscld: null, dataSourceName: parseStringAttrToScopeDataSourceName(attrs.virtualScroll), height: 0, elements: { scroll: element.find(".virtual-scroll-scroll"), listBox: null } };

            var _ds = findObjectProperty(scope, _curr.dataSourceName);

            controller.ds = _ds;

            scope.ds = _ds;

            _curr.height = element.height();


            _curr.elements.scroll.height(_curr.height);
            
            transclude(scope, function (clone, scp) {          
                _curr.trnscld = concatTransEl(clone);
            });

            scope.test = "test";

            var answersElem = angular.element('<ul><li ng-repeat="item in _cctrl.ds">' + _curr.trnscld + '</li></ul>');

            //console.log("virtualScroll _curr: ", _curr);

            var compileFn = $compile(answersElem);
            compileFn(scope);
            element.find(".virtual-scroll-list-box").append(answersElem);
            _curr.elements.listBox = element.find(".virtual-scroll-list-box");
            _curr.elements.listBox.height(_curr.height);
            _curr.elements.listBox.on("scroll", function (event) {
                console.log("on scroll", event.target.scrollTop);
            });

        }

        return {
            transclude: true,
            templateUrl: 'virtualScrollDirectiveTemplate.html?t=1',
            link: link,
            controller: 'VirtualScrollCtrl',
            controllerAs: '_cctrl'
        };
    }

    angular.module('app').directive('virtualScroll', ['$compile', fn]);

})();