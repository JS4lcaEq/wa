(function () {

    Vue.component('homePageComponent', {
        template:
        '<div>'+
        '<h1>Home page</h1>' +
        '<h2>дочерний компонент "test-component"</h2>' +
        '===========  test-component ====================' +
        '<test-component></test-component>' +
        '=========== /test-component ===================='+
        '</div>'
    });


})();
