(function ($interval, $routeProvider) {


    function MyComponentController() {
        // поведение компонента определяет контроллер
        this.componentCtrlValue = "componentCtrlValue";
    }

    // вместо фабрики мы используем обычные объекты
    const myComponentDefinition = {
        // вместо scope + bindToController: true
        // у нас появился более удобный способ объявлять биндинги
        bindings: {
            'name': '='
        },
        // так же как и для директив, мы можем либо применить шаблон
        // либо воспользоваться `templateUrl`
        // мы так же можем использовать функции
        // для динамического объявления шаблонов
        template: '<div class ="my-component"><span>my-component:</span> <strong>{{ $ctrl.name }}</strong> ; "{{$ctrl.componentCtrlValue}}"</div>',

        // тут примерно так же как и в случае с директивами
        // единственное что `controllerAs` используется всегда
        // в случае если вы явно не прописали элиас для контроллера
        // будет использовано значение `$ctrl`.
        controller: MyComponentController
    }

    // спецификация HTML5 требует наличия хотя бы одного дефиса 
    // в имени кастомных элементов. В нашем случае это my-component
    angular.module('app').component('myComponent', myComponentDefinition);



})();