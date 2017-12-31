(function () {

    function fn() {

        var _curr = { store: {} };

        return {
            Get: function (url) {
                if (url) {
                    if (!_curr.store[url]) {
                        _curr.store[url] = null;
                        $.ajax(
                            {
                                url: url,
                                async: false,
                                dataType: "text",
                                success: function (data) {
                                    _curr.store[url] = data;
                                },
                                error: function (jqXHR, textStatus, errorThrown) {
                                    throw new Error("TemplateService: " + textStatus + " while loading template " + url );
                                }
                            }
                        );
                    }
                    return _curr.store[url];
                }
                return null;
            }
        };

    }

    app.services("TemplateService", fn);

})();