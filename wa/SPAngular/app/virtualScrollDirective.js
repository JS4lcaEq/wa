(function () {




    function concatTransEl(elements) {
        var tmpl = "";
        for (var i = 0; i < elements.length; i++) {
            if (elements[i].outerHTML && elements[i].outerHTML != undefined) {
                tmpl += elements[i].outerHTML; //elements[1].outerHTML
            }

        }
        return tmpl;
    }

    function fn($compile) {
        function link (scope, element, attrs, ctrl, transclude) {
                var tr = null;
                
                transclude(scope, function (clone, _scope) {
                    tr = concatTransEl(clone);
                });

                
                scope.test = "test";
                scope.data = [1, 2, 3];
                scope.srcData = [1, 2, 3, 4];

                scope.onClick = function () {
                    alert("virtualScroll onClick !!!")
                }

                var _scope = scope;
                var answersElem = angular.element('<ul><li ng-repeat="item in [1,2,3]">'+tr+'</li></ul>');
                //console.log('compileFn clone=', tr, ' scope=', scope);
                var compileFn = $compile(answersElem);
                compileFn(scope);
                element.find(".virtual-scroll-list-box").append(answersElem);


            }
        return {
            transclude: true,
            templateUrl: 'virtualScrollDirectiveTemplate.html',
            link: link,
            scope: {
                windowData: "=",
                srcData: "="
            }
        };
    }

    angular.module('app').directive('virtualScroll', ['$compile', fn]);

})();