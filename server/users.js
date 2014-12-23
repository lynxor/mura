exports.Users = Users;

function Users(app, db){
    var that = this;

    app.param("pre_pop_userid", function(req, res, next, userid){
        db.village.findOne({_id: new ObjectId(userid)}, function(err, user){
            req.user = user;
        });
    });


    app.get("/user/list", function(req, res){
        db.user.find({}, function(err, users){
            res.render('user/user_list', {users: users} );
        });
    });

    app.get("/user/add", function(req, res){
       res.render("user/user_add", {});
    });

    app.post("/user/add", function(req, res){
       db.user.insert(req.body, function(){
          res.json({success: true});
       });
    });

    app.get("/user/:pre_pop_userid", function(req, res){
        res.render("user/profile", {user: req.user});
    });
}