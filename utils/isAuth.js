const jwt = require('jsonwebtoken');
const secret = "hellosecret"

exports.createToken =  async (user)=>{
    if(!user) return null;
    
    const token = await jwt.sign({...user},secret);
    // console.log(token);
    return token;
}

exports.isAuthenticated = async (req,res,next)=>{
    const  token = req.cookies?.token;
    if(!token) return res.status(400).send({msg:"Please Login"});
    const user = jwt.verify(token,secret)._doc;
    if(!user) {
        req.cookies('token',null);
        return res.status(400).send({msg:'Please login in again'})
    }
    else{
        req.user = {...user};
    }
    next();
}

exports.isAdmin = async (req,res,next)=>{
    if(req.user.role != 'admin'){
        return res.status(400).send({
            success:"false",
            msg:'You ar not admin'
        })
    }
    if(req.user.role == 'admin'){
        next();
    }else{
    return res.status(400).send({
            success:"false",
            msg:"Something went wrong"
        })
    }
}
