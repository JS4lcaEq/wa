(function () {




    var _routes = {
        items: {
            '#1': "p1-component",
            '#2': "p2-component",
            '#null': "null-component"
        },
        get: function (hash) {
            var self = this;
            if (hash) {
                return { hash: hash, componet: self.items[hash] };
            } else {
                return { hash: hash, componet: self.items["#null"] };
            }
            
        }

    };







    var vue = new Vue({
        el: '#vue',

        data: {
            data: { route: { hash: null, component: null }},
            data1: 'Hello Vue!'


        },

        methods: {
            method1: function () {
                return _ds;
            },

        },

        computed: {
            computed1: function () {
                return ;
            }

        }
    });

    //pplctn.services("TreeService").setOnLoadFunction(function (data) {
    //    _ds.set(data);
    //});



    // data.data = pplctn.services("TreeService").get();

    //pplctn.vue.tree = data;
    //alert("vue");
    $(window).on("hashchange", function () { vue.data.route = _routes.get(window.location.hash); });
    vue.data.route = _routes.get(window.location.hash);
})();
