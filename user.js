var conf = module.parent.parent.require('./meta').config,
    db = module.parent.parent.require('../src/database'),
    coreUser = module.parent.parent.require('../src/user');

User = {};

User.init = function(app){

    this.baseURL = conf["api:baseURL"] + "/users";

    app.get(this.baseURL+"/:slug",function(req, res, next){
        coreUser.getUidByUserslug(req.params.slug, function(err, uid){
            if(!err){
                coreUser.getUserData(uid, function(err, userdata){
                    res.status(200).json(userdata);
                });            
            }else{
                res.status(404);
            }
        });     
    });
};


module.exports = User