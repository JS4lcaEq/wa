(function () {
    var _options = { scroll: { base: 100, step: 58 } };
    var _curr = { elements: {}, scroll: { min: 0, max: 0 } };
    _curr.scroll.min = _options.scroll.base - _options.scroll.step;
    _curr.scroll.max = _options.scroll.base + _options.scroll.step;
    Vue.component('virtual-scroll-component-v1', {
        template:
        '<div class="virtual-scroll-component" v-on:load="onLoad">' +
        '  <div class="virtual-scroll-component-scroll" v-on:scroll="onFastScroll">' +
        '    <div class="virtual-scroll-component-slider"></div>' +
        '  </div>' +
        '  <div class="virtual-scroll-component-list-box" v-on:scroll="onScroll" >' +
        '    <ul v-if="(wndw && wndw.length > 0)" v-bind:style="listBoxStyle">' +
        '        <li v-for="item in wndw"> <slot  name="itemTemplate" :item="item"></slot> </li>' +
        '    </ul>' +
        '  </div>' +
        '</div>',

        data: function () {

            return {
                startIndex: 0,
                endIndex: 20,
                listBoxStyle: { "height": "402px" }
            }
        },

        computed: {
            wndw: function () {
                var self = this;
                var ret = null;
                if ($.isArray(self.src)) {
                    var ret = [];
                    for (var i = self.startIndex; i < self.endIndex; i++) {
                        ret.push(self.src[i]);
                    }
                }
                console.log("$el", this.$el);
                return ret;
            }
        },

        methods: {
            onLoad: function (event) {
                console.log("virtual-scroll-component onLoad: event=", event);
            },
            onScroll: function (event) {

                if (event.target.scrollTop > _curr.scroll.max) {
                    console.log("virtual-scroll-component onScroll: UP = ", event.target.scrollTop);
                    this.$emit("on-scroll-up");
                    event.target.scrollTop = _options.scroll.base;
                }
                if (event.target.scrollTop < _curr.scroll.min) {
                    console.log("virtual-scroll-component onScroll: DOWN = ", event.target.scrollTop);
                    this.$emit("on-scroll-down");
                    event.target.scrollTop = _options.scroll.base;
                }

                //setTimeout(function () { event.target.scrollTop = 100; }, 1);
                return true;
            },
            onFastScroll: function (event) {
                var scroll = event.target.scrollTop;
                this.$emit("on-scroll-down");
            }
        },

        props: ["src" ]

    })

})();
