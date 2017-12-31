(function () {

    var rs = app.services("RouteService").New("routes.json?t=" + Math.random());
    console.log(rs);
    var vue = new Vue({
        el: '#vue',

        data: {
            data: { routes: rs.get() }
        },

        methods: {
        },

        computed: {
        }

    });

    rs.setOnChange(function (data) {
        vue.data.routes = data; 
    });

    //$(window).on("hashchange" , function () { vue.data.hash = window.location.hash; });
    //vue.data.hash = window.location.hash;
})();
