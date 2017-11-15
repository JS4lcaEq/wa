(function () {


    function fn($scope, $element, $attrs) {
        this.name = 'VirtualScrollCtrl';
        this.scope = $scope;
        this.element = $element;
        this.attrs = $attrs;
        this.scope_ctrl_data = $scope["ctrl"]["data"];
        console.log("VirtualScrollCtrl $scope", $scope);
    }

    angular.module('app').controller('VirtualScrollCtrl',  fn);

})();