(function () {
    var _curr = {
        routes: [
            { hashMask: '#Home.*', component: 'home-page-component', text: "Home", link: "#Home" },
            { hashMask: '#Page1.*', component: 'page1-component', text: "Page1", link: "#Page1" },
            { hashMask: '.*', component: 'notfound-page-component', text: "Not found", link: "#NotFound" },
        ]
    };


    var c = Vue.extend({
        template: app.services("TemplateService").Get("app/components/RouterTemplate.html")
        ,
        data: function () {
            return {
                routes: _curr.routes,
                cHash: null
            }
        },

        computed: {
            cRoute: function () {
                for (var i = 0; i < _curr.routes.length; i++) {
                    var item = _curr.routes[i];
                    item.hashMask
                }
            }
        },

        methods: {

        },

        beforeCreate: function () {
            //this.template = pplctn.services("TemplateService").Get("app/components/RouterTemplate.html");
        },

        created: function () {
            var self = this;
            
            console.log('created', self);
            $(window).on("hashchange" , function () {
                self.cHash = window.location.hash;
            });
            self.cHash = window.location.hash;
        },

        props: {  }


    });
    Vue.component('router-component', c);


})();
