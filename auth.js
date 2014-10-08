var md5 = require('MD5');
var conf = module.parent.parent.parent.require('./meta').config;

function authenticate(req, res, next) {

    if (!conf["api:authEnable"]){
        next();
        return;
    }

    var credentials = {
        hash : req.get("auth-hash"),
        timestamp : req.get("auth-timestamp")
    };

    if (!credentials.hash || !credentials.timestamp){
        res.status(401);
        res.json({
            "messsage" : "Missing auth headers"
        });
    }
    else{

        var currentTime = new Date().getTime();

        if (!conf["api:secret"]){
            res.status(401)
            res.json({
                "messsage" : "Bad credentials"
            });
            return;
        }

        // Is timestamp too old?
        if ((currentTime - credentials.timestamp) / 1000   > conf["api:authTimestampLiveTime"]) {
            res.status(401)
            res.json({
                "messsage" : "Expired request"
            });
            return;
        }

        // let check the password
        if (md5(conf["api:secret"] + credentials.timestamp) == credentials.hash){
            // login successfull, let's allow the request
            next();   
        }
        else{
            // bad username/ password
            res.status(401)
            res.json({
                "messsage" : "Bad credentials"
            });
        }

    }
    
}

module.exports.authenticate = authenticate;