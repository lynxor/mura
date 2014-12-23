/**
 * Created by daaf on 12/23/14.
 */

var _ = require("underscore");

exports.postConfig = postConfig;
exports.postJson = postJson;

function postConfig(messages){
    return {
        type:"POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        error: function(err){
           if(messages){
               messages.errors.push(err);
           }
        },
        success: function(result){
            if(messages){
                messages.info("Success");
            }
        }
    }
}
function postJson(url, data, success, messages){
    var jsonData = _.isString(data)? data: JSON.stringify(data),
        config =  {url: url, data: jsonData };

    if(success && _.isFunction(success)){
        config.success = success;
    }

    $.ajax(_.extend(postConfig(messages),config));
}