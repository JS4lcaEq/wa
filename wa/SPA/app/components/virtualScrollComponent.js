(function () {

    Vue.component('virtual-scroll-component', {
        template:
        '<div class="virtual-scroll-component">' +
        '  <div class="virtual-scroll-component-scroll">' +
        '    <div class="virtual-scroll-component-slider"></div>' +
        '  </div>' +

        '  <div class="virtual-scroll-component-list-box">' +
        '    <ul v-if="$.isArray(wndw)">' +
        '        <li v-for="item in wndw"><slot  name="itemTemplate" :item="item"></slot></li>' +
        '    </ul>' +
        '  </div>' +


        '</div>',
        data: function () {
            return {startIndex: 0, endIndex: 5}
        },
        computed: {
            wndw: function () {
                var ret = null;
                if ($.isArray(this.src)) {
                    ret = [];
                    for (var i = this.startIndex; i < this.endIndex; i++) {
                        ret.push(this.src[i]);
                    }
                }

                return ret;
            }
        },
        props: ["src"]
    })

})();
