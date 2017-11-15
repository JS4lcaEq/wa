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

    function parseStringNameToNamesArray(name) {
        var names = [];
        if (name) {
            names = name.split(".");
        }
        return names;
    }

    function parseStringAttrToScopeDataSourceName(attr) {
        var name = null;

    }

    function fn($compile, VirtualScrollService) {

        function link(scope, element, attrs, cctrl, transclude) {

            console.log(scope, element, attrs, cctrl);
            var _curr = { tr: null, height: 0, elements: { scroll: element.find(".virtual-scroll-scroll"), listBox: null } };
            _curr.height = element.height();
            cctrl.curr = _curr;

            _curr.elements.scroll.height(_curr.height);
            
            transclude(scope, function (clone, scp) {          
                _curr.tr = concatTransEl(clone);
            });

            scope.test = "test";

            var answersElem = angular.element('<ul><li ng-repeat="' + attrs.src + '">' + _curr.tr + '</li></ul>');

            //console.log('compileFn clone=', tr, ' scope=', scope);

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