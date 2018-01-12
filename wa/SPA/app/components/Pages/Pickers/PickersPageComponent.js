(function () {

    Vue.component('pickersPageComponent', {
        template: app.services("TemplateService").Get("app/components/Pages/Pickers/PickersPageComponent.html"),
        data: function() {
            return { dataPickerModel: null };
        }
    });


})();
