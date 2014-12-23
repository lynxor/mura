var _ = require("underscore"),
    ko = require("knockout"),
    InfoModel = require("./helpers/info_model").InfoModel,
    postJson = require("./helpers/ajax_helpers").postJson;

function VillageAddModel(){
   var that = this;
    that.messages = new InfoModel();

    that.name = ko.observable("");
    that.chief = ko.observable("");


    that.addVillage = function() {
        postJson("/village/add",
            {name: that.name(), citizens: [], chief: that.chief()},
            function (res) {
                if (res.success) {
                    that.messages.info("Added");
                }
            }
        );
    };
}

$(function(){
   ko.applyBindings(new VillageAddModel());
});



