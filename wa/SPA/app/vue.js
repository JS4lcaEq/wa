(function () {

    var vue = new Vue({
        el: '#vue',
        data: {
            message: 'Hello Vue!',
            ds: null
        },
        methods: {
            DS: function () {
                return app.services("ds").get();
            }
        }
        , computed: {
            Ds: function () {
                //this.ds = window.app.services("ds").get();
                return this.ds;
            }
        }
    });

    app.services("ds").onLoad = function (data) {
        vue.ds = data;
    };

    vue.ds = app.services("ds").get();

})();
