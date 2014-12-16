var auth = require("./auth.js").authenticate,
    conf = module.parent.parent.require('./meta').config,
    db = module.parent.parent.require('../src/database'),
    coreTopics = module.parent.parent.require('../src/topics');

Topics = {};

Topics.init = function(app){

    this.baseURL = conf["api:baseURL"] + "/topics";

    /*
        Create a new topic.

        {
            "uid" = 1, //userid
            "title" = "Hilo del equipo 1",
            "content" = "Este es el hilo del equipo 1, donde podréis comentar y poner en común lo que necesitéis",
            "cid" = 5 //categoryid
        }
    */
    app.post(this.baseURL,auth,function(req, res, next){

        if (!req.body.uid || !req.body.title || !req.body.content || !req.body.cid ){

            res.status(400).json({
                message: "Bad parameters",
            });
            return;
        }

        data = {
            uid : req.body.uid,
            title : req.body.title,
            content: req.body.content,
            cid: req.body.cid
        };

           
        coreTopics.post(data, function(err,data){
            if (err){
                res.status(500).json(err);
            }       
            else{
                console.log(data);
                res.status(200).json({
                    "slug" : data.topicData.slug,
                    "cid": data.topicData.tid,
                });
            }
        });
        
    });

    app.delete(this.baseURL +"/:tid",auth,function(req, res, next){

        coreTopics.delete(req.params.tid, function(e,data){
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

    app.delete(this.baseURL +"/:tid/purge",auth,function(req, res, next){
        
        coreTopics.purge(req.params.tid, function(e,data){
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


module.exports = Topics