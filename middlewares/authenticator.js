const jwt = require("jsonwebtoken");

const authenticator = (req, res, next)=>{
    const token = req.headers.authorization;
    if(token){
        const decoded = jwt.verify(token, process.env.key);
        if(decoded){
            const userID = decoded._id;
            req.body.userId=userID;
            next();
        }else{
            res.send("Please Login First");
        }
    } else {
        res.send("Please Login First");
    }
}

module.exports = { authenticator };