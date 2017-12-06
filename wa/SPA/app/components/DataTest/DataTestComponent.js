(function () {

    var _ws = pplctn.services("WindowService").New();
    _ws.SetLen(11);

    var cc = Vue.component('data-test-component', {

        template: '<div>updated: {{updated}} <hr />{{src}}<hr />Get: {{Get}}<hr />win: {{win}}</div>',

        data: function () {
            return {
                updated: 0,
                win: []
            }
        },

        computed: {
            Get: function () {
                var self = this;
                return "computed Get";
            }
        },

        methods: {
            onUpdated: function () {
                this.updated = "onUpdated";
            }
        },

        created: function () {
            var self = this;
            var ds = pplctn.services("StoreService").Get(self.src);
            ds.addObserver(function (data) {
                _ws.SetSrc(data);
                self.win = _ws.Get();
            });
        },

        watch: {
            src: function (val) {
                console.log("watch src");
            }
        },

        props: { "src": null }

    });

    setTimeout(function () {
        console.log("cc", cc);
        cc.updated = new Date();
    }, 100);

})();
