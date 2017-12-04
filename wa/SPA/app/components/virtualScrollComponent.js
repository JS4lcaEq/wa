(function () {
    var _options = { scroll: { base: 90, step: 30 } };
    var _curr = { elements: {}, scroll: { min: 0, max: 0, isFastScroll: false}, indexes: { start: 0, end: 0, max: 0 }};
    _curr.scroll.min = _options.scroll.base - _options.scroll.step;
    _curr.scroll.max = _options.scroll.base + _options.scroll.step;
    var _index = 0;

    var _ds = window.pplctn.services("DataSourceService").New();

    var _ws = window.pplctn.services("WindowService").New();

    _ws.SetLen(20);

    Vue.component('virtual-scroll-component', {
        template: pplctn.services("TemplateService").Get("app/components/virtualScrollTemplate.html"),

        data: function () {
            //console.log("data ");
            return {
                current: { _index: 0, _elements: { component: null }, id: "virtual-scroll-component_" },
                startIndex: 0,
                endIndex: 30,
                styles: {
                    scroll: { "height": "0" },
                    listBox: { "height": "0" }
                },
                elements: {
                    component: {
                        jquery: null
                    },
                    scroll: {
                        jquery: null,
                        style: { "height": "0" }
                    },
                    slider: {
                        jquery: null,
                        style: { "height": "200px" }
                    },
                    listBox: {
                        jquery: null,
                        style: { "height": "0" }
                    },
                    listItem: {
                        style: { "height": "30px" }
                    }
                },
                wndw: _ws.Get()
            };
        },

        computed: {
            
        },

        methods: {

            onScroll: function (event) {

                var self = this;
                var cScroll = event.target.scrollTop;

                if (cScroll > _curr.scroll.max) {
                    _ws.Up();
                    self.wndw = _ws.Get();
                    self.elements.scroll.jquery.get(0).scrollTop = _ws.GetIndexes().start * _options.scroll.step;
                    event.target.scrollTop = cScroll - _options.scroll.step;
                }

                if (cScroll < _curr.scroll.min) {
                    _ws.Down();
                    self.wndw = _ws.Get();
                    if (_ws.Debug().start > 0) {
                        event.target.scrollTop = cScroll + _options.scroll.step;
                        self.elements.scroll.jquery.get(0).scrollTop = _ws.GetIndexes().start * _options.scroll.step;
                    }
                }

                return true;
            },
            onFastScroll: function (event) {
                var self = this;
                var scroll = event.target.scrollTop;
                var startIndex = 0;
                if (scroll > 0) {
                    startIndex = Math.round(scroll / _options.scroll.step);
                }
                 
                _ws.SetStartIndex(startIndex);
                self.wndw = _ws.Get();
                if (startIndex > 0) {
                    self.elements.listBox.jquery.get(0).scrollTop = _options.scroll.base;
                } else {
                    self.elements.listBox.jquery.get(0).scrollTop = 0;
                }
            }
        },
        mounted: function () {
            this.elements.component.jquery = $(this.$el);
            this.elements.listBox.jquery = $(this.$el).find(".virtual-scroll-component-list-box");
            this.elements.scroll.jquery = $(this.$el).find(".virtual-scroll-component-scroll");
            this.elements.scroll.style.height = this.elements.component.jquery.height() + "px";
            this.elements.listBox.style.height = this.elements.component.jquery.height() + "px";
            this.elements.listItem.style.height = _options.scroll.step + "px";

        },
        beforeCreate: function () {
            console.log("virtual-scroll-component beforeCreate");
        },
        created: function () {
            var self = this;
            self.current._index = _index;
            self.current.id += _index;
            _index++;
            _ds.addObserver(function (data) {
                _ws.SetSrc(data);
                self.wndw = _ws.Get();
                self.elements.slider.style.height = data.length * _options.scroll.step + "px";
            });
        },
        props: ["src"]

    });

})();
