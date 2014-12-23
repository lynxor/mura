exports.Village = Village;

var ObjectId = require("mongojs").ObjectId;

function Village(app, db){
    var that = this;

    app.param("pre_pop_villageid", function(req, res, next, villageid){
       db.village.findOne({_id: new ObjectId(villageid)}, function(err, village){
          req.village = village;
       });
    });

    app.get("/village/list", function(req, res){
        db.village.find({}, function(err, villages){
            res.render('village/village_list', {villages: villages} );
        });
    });

    app.get("/village/add", function(req, res){
        res.render("village/village_add", {});
    });

    app.post("/village/add", function(req, res){
        db.village.insert(req.body, function(){
            res.json({success: true});
        });
    });

    app.post("/village/add-citizen/:pre_pop_villageid/:userid", function(req, res){
        var village = req.village;
        if(!village.chief && village.citizens.length === 0){
            req.params.villageid = village._id.toString();
            return setChief(req, res);
        }
        db.village.update({_id: req.village._id}, {$addToSet: {citizens: req.params.userid}}, function(err){
            res.json({success: true});
        });
    });

    app.post("/village/remove-citizen/:villageid/:userid", function(req, res){
        db.village.update({_id: new ObjectId(req.params.villageid)}, {$pullAll: {citizens: req.params.userid}}, function(err){
            res.json({success: true});
        });
    });

    app.post("/village/set-chief/:villageid/:userid", setChief);

    function setChief(req, res){
        db.village.update({_id: new ObjectId(req.params.villageid)}, {$set: {chief: req.params.userid}}, function(err){
            res.json({success: true});
        });
    }
}