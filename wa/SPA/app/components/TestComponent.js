(function () {
    var _ds = pplctn.services("DataSourceService").New();

    function update(dst) {
        var ret = [];
        var dt = _ds.get();
        if (dt.length > 0) {
            for (var i = 0; i < 10; i++) {
                ret.push(dt[i]);
            }
        }
        return ret;
    }
    
    var cc = Vue.component('test-component', {
        template:
        '<div><p>src:{{src}} | updated: {{updated}}</p>' +
        '<ul v-if="(win && win.length > 0)">' +
        '   <li v-for="item in win"> <slot  name="itemTemplate" :item="item"></slot> </li>' +
        '</ul>' +
        '</div>',

        data: function () {
            return {
                updated: 0,
                win:null
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
            _ds.addObserver(function (data) { self.win = update(); });
            self.win = update();
        },
        props: { "src": null }


    });


})();
