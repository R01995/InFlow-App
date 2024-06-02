const jwt = require('jsonwebtoken')

//after registation & login 3

module.exports = (req, res, next) => {
    const token = req.headers['token']
    jwt.verify(token, "rahul123",(error, decoded)=>{
        if(error){
            return res.status(401).json({status:"Unauthorized"})
        }
        else{
            let emeil = decoded['data']
            req.headers.email = emeil
            next()
        }
    })
}