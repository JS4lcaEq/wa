(function () {

    function fn(injections) {
        
        var _items = null;
        var _branches = {};
        var url = ""
        return {
            prop: "prop",
            get: function () {
                var self = this;
                if (!_items) {
                    _items = "load..."
                    //setTimeout(function () {
                    //    _items = "loaded!!!";
                    //    if (self.onLoad) {
                    //        self.onLoad(_items);
                    //    }
                    //}, 1000);
                    //$.get("/api/Vue?t=" + Math.random()).done(function (data) {
                    //    _items = data.data;
                    //    if (self.onLoad) {
                    //        self.onLoad(_items);
                    //    }
                    //});
                    self.load("");
                }



                return _items;
            },
            // загрузка ветки по idp 
            load: function (idp) {
                var self = this;
                $.get("/api/Vue/" + idp + "?t=" + Math.random()).done(function (data) {
                    _items = data.data;
                    if (self.onLoad) {
                        self.onLoad(_items);
                    }
                });
            },

            onLoad: null
        };

    }

    app.services("ds", fn, ["Injection1", "Injection2"]);

})();