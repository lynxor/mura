var _ = require("underscore"),
    ko = require("knockout"),
    InfoModel = require("./helpers/info_model").InfoModel,
    postJson = require("./helpers/ajax_helpers").postJson;

function UserAddModel(){
   var that = this;
    that.messages = new InfoModel();

    that.name = ko.observable("");
    that.email = ko.observable("");

    that.addUser = function(){
        postJson("/user/add", {name: that.name(), email: that.email()}, function(res){
            if(res.success){
               that.messages.info("Added user");
            }
        });
    }
}


$(function(){
    ko.applyBindings(new UserAddModel());
});


