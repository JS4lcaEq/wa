(function () {




    var _routes = {
        '#Home': "home-page-component",
        '#Page1': "page1-component",
        'notfound': "notfound-page-component"
    };







    var _ws1 = pplctn.services("WindowService").New();
    var _ds = pplctn.services("DataSourceService").New();
    var data = { data: null };

    var _testData = {};

    pplctn.services("TreeService");

    pplctn.vue = new Vue({
        el: '#vue',

        data: {
            message: 'Hello Vue!',
            ds: _ds,
            tree: null,
            ws1: _ws1,
            ws2: pplctn.services("WindowService").New(),
            ds1: pplctn.services("TreeService"),
            test: 0,
            testIndex: [],
            dataSourceUpdated: 0,

            currentRoute: window.location.hash

        },

        methods: {
            DS: function () {
                return _ds;
            },
            ld: function (idp) {
                //console.log("idp", idp);
                pplctn.services("TreeService").trigger(idp);
            },
            onScrollUp: function () {
                console.log("vue onScrollUp!");
                _ws1.Up();
                pplctn.vue.tree = _ws1.Get();
            },
            onScrollDown: function () {
                //console.log("vue onScrollDown!");
                //_ws1.Down();
                //pplctn.vue.tree = _ws1.Get();
            },
            onTest: function () {
                var _test = [];
                var _name = Math.random();
                for (var i = 0; i < 100000; i++) {
                    _test.push({"id": i, "nm":_name + "_" + i});
                }
                _testData[_name] = _test;
                this.testIndex.push(_name);
                //this.test.data = _test;
            },
            onTestChange: function (name) {
                setTimeout(function () {_ds.set(_testData[name]); }, 10);
                

            }
        },

        computed: {
            Ds: function () {
                return pplctn.services("DataSourceService");
            }
            , ViewComponent: function () {
                return _routes[this.currentRoute] || _routes.notfound;
            }
        }
        //, render: function (h) {
        //    return h(this.ViewComponent);
        //}
    });

    pplctn.services("TreeService").setOnLoadFunction(function (data) {
        _ds.set(data);
    });

    pplctn.vue.tree = pplctn.services("TreeService").get();

    // data.data = pplctn.services("TreeService").get();

    //pplctn.vue.tree = data;
    //alert("vue");
    $(window).on("hashchange" , function () { pplctn.vue.currentRoute = window.location.hash; });

})();
