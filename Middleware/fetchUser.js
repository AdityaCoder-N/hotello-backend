const jwt = require('jsonwebtoken')
const JWT_secret = "thisisanimportantstring1234"

const fetchUser = (req,res,next)=>{

    const token = req.header('auth-token');

    if(!token){
        res.status(401).json('Please validate using a valid token');
    }

    try {
        const data = jwt.verify(token,JWT_secret);
    
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).json({error:"Please validate using a valid token"})
    }

}

module.exports = fetchUser;
