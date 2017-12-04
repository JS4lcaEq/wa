(function () {

    var cc = Vue.component('data-test-component', {

        template: '<div>{{src}}</div>',

        data: function () {
            return {
                updated: 0

            }
        },

        computed: {

        },

        methods: {
            onUpdated: function () {
                this.updated = "onUpdated";
            }
        },

        created: function () {
            var self = this;
        },



        props: { "src": null }

    });

})();
