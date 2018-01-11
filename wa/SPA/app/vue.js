(function () {

    //var rs = app.services("RouteService").New("routes.json?t=" + Math.random());
    //console.log(rs);

    // 1. Определение используемых компонентов
    // Они могут быть импортированы из внешних файлов
    const Foo = { template: '<div>foo</div>' };
    const Bar = { template: '<div>bar{{data}}</div>', data: function () { return { data: "data" }; } };

    // 2. Определение путей
    // Каждый путь должен указывать на компонент
    // "Компонентом" может быть как созданный через `Vue.extend()`
    // полноценный конструктор, так и просто объект с настройками компонента
    // Вложенные пути будут рассмотрены далее.
    const routes = [
        { path: '/', component: Vue.component('homePageComponent') },
        { path: '/foo', component: Vue.component('page1Component') },
        { path: '/bar', component: Vue.component('page1Component')},
        { path: '/bar/:id', component: Vue.component('page1Component') },
        { path: '/bar/:p1/:p2', component: Vue.component('page1Component') }

    ];

    // 3. Создаём экземпляр роутера с опцией `routes`
    // Можно передать и другие опции, но пока не будем усложнять
    const router = new VueRouter({
        routes: routes
    });



    var vue = new Vue({
        el: '#vue',
        router: router,
        data: {
            data: {
                //routes: rs.get()
                param: "param"
            }
        },

        methods: {
        },

        computed: {
        }

    });

    //rs.setOnChange(function (data) {
    //    vue.data.routes = data; 
    //});


})();
