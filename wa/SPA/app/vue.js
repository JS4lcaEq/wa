(function () {

    app.vue = new Vue({
        el: '#vue',
        data: {
            message: 'Hello Vue!',
            ds: null,
            tree: null
        },
        methods: {
            DS: function () {
                return app.services("ds").get();
            },
            ld: function (idp) {
                console.log("idp", idp);
                app.services("TreeService").trigger(idp);
            }
        }
        , computed: {
            Ds: function () {
                //this.ds = window.app.services("ds").get();
                return this.ds;
            }
        }
    });

    app.services("TreeService").setOnLoadFunction(function (data) {
        app.vue.tree = data;
    });

    app.vue.tree = app.services("TreeService").get();

})();
