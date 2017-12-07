(function () {
    var _options = { itemHeight: 30, scroll: { base: 90, step: 30 } };
    var _curr = {
        elements: {},
        scroll: { min: 0, max: 0, isFastScroll: false, isSlowScroll: false , prev: 0},
        indexes: { start: 0, end: 0, max: 0 },
        k: 1,
        stat: {}

    };
    _curr.scroll.min = _options.scroll.base;
    //_curr.scroll.min = _options.scroll.base - _options.scroll.step;
    _curr.scroll.max = _options.scroll.base;
    //_curr.scroll.max = _options.scroll.base + _options.scroll.step;
    var _index = 0;

    var _ws = window.pplctn.services("WindowService").New();
    _ws.SetLen(30);

    function _addStat(scroll){
        if (!_curr.stat[scroll]) {
            _curr.stat[scroll] = 0;
        }
        _curr.stat[scroll]++;
        //console.log("stat:",_curr.stat);
    }

    Vue.component('virtual-scroll-component', {
        template: pplctn.services("TemplateService").Get("app/components/VirtualScroll/virtualScrollTemplate.html"),

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
                    },
                    debug: {
                        style: {"display": "block"}
                    }
                },
                wndw: [],
                debug: { height: 0, calcHeight: 0, index: 0, sliderHeight: 0, dataLength: 0, k: 0, "scroll.min": _curr.scroll.min, "stat": {}}

            };
        },

        computed: {
            getDebugStyle: function () {
                var self = this;
                if (self.debugMode && self.debugMode == "true") {
                    return { "display": "block" };
                }
                return { "display": "none" };
            }


        },

        methods: {

            onScroll: function (event) {
                var cScroll = event.target.scrollTop;
                var diff = cScroll - _curr.scroll.prev;
                _addStat(diff);
                var self = this;


                if (!_curr.isFastScroll) {
                    

                    if (cScroll > _curr.scroll.max) {
                        _ws.Up();
                        _ws.Up();
                        self.wndw = _ws.Get();
                        self.debug.index = _ws.GetIndexes().start;
                        _curr.isSlowScroll = true;
                        self.elements.scroll.jquery.get(0).scrollTop = _ws.GetIndexes().start * _curr.k; //_options.scroll.step;
                        //event.target.scrollTop = cScroll - _options.scroll.step;
                        event.target.scrollTop = _options.scroll.base;
                    }

                    if (cScroll < _curr.scroll.min) {
                        _ws.Down();
                        _ws.Down();
                        self.debug.index = _ws.GetIndexes().start;
                        self.wndw = _ws.Get();
                        if (_ws.GetIndexes().start > 0) {
                            
                            _curr.isSlowScroll = true;
                            self.elements.scroll.jquery.get(0).scrollTop = _ws.GetIndexes().start * _curr.k; // _options.scroll.step;
                            //event.target.scrollTop = cScroll + _options.scroll.step;
                            event.target.scrollTop = _options.scroll.base;
                        }
                    }
                }

                _curr.isFastScroll = false;
                _curr.scroll.prev = cScroll;
                return true;
            },
            onFastScroll: function (event) {
                var self = this;

                if (!_curr.isSlowScroll) {
                    _curr.isFastScroll = true;
                    var scroll = event.target.scrollTop;
                    console.log("scroll = ", scroll);
                    var startIndex = 0;
                    if (scroll > 0) {
                        startIndex = Math.round(scroll / _curr.k);
                    }
                 
                    _ws.SetStartIndex(startIndex);
                    self.debug.index = _ws.GetIndexes().start;
                    self.wndw = _ws.Get();
                    if (startIndex > 0) {
                        self.elements.listBox.jquery.get(0).scrollTop = _options.scroll.base;
                    } else {
                        self.elements.listBox.jquery.get(0).scrollTop = 0;
                    }
                }

                _curr.isSlowScroll = false;
            },
            onDebugClick: function () {
                var self = this;
                self.debug.stat = _curr.stat;
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

            

            var _ds = pplctn.services("StoreService").Get(self.src);

            self.current._index = _index;
            self.current.id += _index;
            _index++;
            _ds.addObserver(function (data) {
                _ws.SetSrc(data);
                self.wndw = _ws.Get();
                var sh = data.length * _options.scroll.step;
                self.debug.height = sh;

                console.log("1 sh = ", sh, " length = ", data.length);

                if (sh > 500000) {
                    sh = 500000;
                }

                self.debug.sliderHeight = sh;

                self.debug.dataLength = data.length;

                _curr.k = (sh - 400) / data.length;

                console.log("k = ", _curr.k);

                self.debug.k = _curr.k;

                self.elements.slider.style.height = sh + "px";
            });

        },

        props: ["src", "itemHeight", "debugMode"]

    });

})();
