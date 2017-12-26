(function () {

    Vue.component('p1-component', {
        template: pplctn.services("TemplateService").Get("Componets/Pages/p1/p1Template.html"),
        data: function () {
            return {
                data: {
                    p1: "p1",
                    p2: "p2"
                }
            };
        },
        props: ["rootData"],
        mounted: function () {
            var self = this;


        }
    });


})();
