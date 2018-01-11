(function () {
    var _options = {  };
    var _curr = {
        elements: {},
        scroll: { min: 0, max: 0, isFastScroll: false, isSlowScroll: false , prev: 0},
        indexes: { start: 0, end: 0, max: 0 },
        k: 1,
        stat: {}

    };


    var _ws = app.services("WindowService").New();
    _ws.SetLen(30);

    //function _addStat(scroll){
    //    if (!_curr.stat[scroll]) {
    //        _curr.stat[scroll] = 0;
    //    }
    //    _curr.stat[scroll]++;
    //    console.log("stat:",_curr.stat);
    //}

    Vue.component('virtual-scroll-emulate-component', {
        template: app.services("TemplateService").Get("app/components/VirtualScrollEmulate/virtualScrollEmulateTemplate.html"),

        data: function () {
            return {


            };
        },

        computed: {


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

        },

        beforeCreate: function () {
            console.log("virtual-scroll-component beforeCreate");
        },

        created: function () {

            var self = this;

            


        },

        props: ["src", "itemHeight", "debugMode"]

    });

})();
