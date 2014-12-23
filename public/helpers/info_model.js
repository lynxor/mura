/**
 * Created by daaf on 12/23/14.
 */
var ko = require("knockout");

exports.InfoModel = InfoModel;

function InfoModel(){
    var that = this;

    that.loading = ko.observable(false);
    that.info = ko.observable();
    that.errors = ko.observableArray([]);


}