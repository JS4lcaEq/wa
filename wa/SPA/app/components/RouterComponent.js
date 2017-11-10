(function () {
    var _curr = {
        routes: [
            { hashMask: '#Home.*', component: 'home-page-component' },
            { hashMask: '#Page1.*', component: 'page1-component' },
            { hashMask: '.*', component: 'notfound-page-component' },
        ]
    };


    var c = Vue.extend({
        template: pplctn.services("TemplateService").Get("app/components/RouterTemplate.html")
        ,
        data: function () {
            return {
                routes: _curr.routes,
                cHash: null
            }
        },

        computed: {

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
