var auth = require("./auth.js").authenticate,
    conf = module.parent.parent.require('./meta').config,
    db = module.parent.parent.require('../src/database'),
    coreCategories = module.parent.parent.require('../src/categories');

Categories = {};

Categories.init = function(app){

    this.baseURL = conf["api:baseURL"] + "/categories";

    /*
        Create a new category.

        {
            "name":"Nueva categoría",
            "description": "Descripción de la nueva categoría",
            "bgColor": "#ccc",
            "color": "#888"
        }
    */
    app.post(this.baseURL,auth,function(req, res, next){

        if (!req.body.name || !req.body.description || !req.body.bgColor
            || !req.body.color ){

            res.status(400).json({
                message: "Bad parameters",
            });
            return;
        }

        data = {
            name : req.body.name,
            description : req.body.description,
            bgColor: req.body.bgColor,
            color: req.body.color,
            order: 0
        };

        coreCategories.getAllCategories(1,function(e,cats){
            for (var i=0;i<cats.length;i++){
                if (data.order < cats[i].order){
                    data.order = cats[i].order;
                }    
            }
            data.order++;
           
            coreCategories.create(data, function(err,data){
                if (err){
                    res.status(500).json(err);
                }       
                else{
                    res.status(200).json({
                        "slug" : data.slug,
                        "cid": data.cid,
                    });
                }
            });
            
        });
        
    });

    app.delete(this.baseURL +"/:cid",auth,function(req, res, next){
        
        data = {};
        data[req.params.cid] = { disabled : 1};

        coreCategories.update(data, function(e,data){
            if (e){
                res.status(400).json({
                    message : "Internal error",
                    error: e,
                });
            }
            else{
                res.json({
                    "message" : "Operation complete successfuly"
                });    
            }
        });

    });

    app.delete(this.baseURL +"/:cid/purge",auth,function(req, res, next){
        
        coreCategories.purge(req.params.cid, function(e,data){
            if (e){
                res.status(400).json({
                    message : "Internal error",
                    error: e,
                });
            }
            else{
                res.json({
                    "message" : "Operation complete successfuly"
                });    
            }
            
        });

    });

};


module.exports = Categories