const joi=require("joi");
const jwt = require("jsonwebtoken");

const SingupValidation=(req,res,next)=>{
    const schema=joi.object({
        name:joi.string().required().min(3).max(100),
        email:joi.string().email().required(),
        password:joi.string().required().min(6).max(10),
    });
    const{error}=schema.validate(req.body);
    if(error){
        return res.status(400).json({
            message:"bad request", error,
            success:false
        })
    }
    next()
}




const loginValidation=(req,res,next)=>{
    const schema=joi.object({
        email:joi.string().email().required(),
        password:joi.string().required().min(6).max(10),
    });
    const{error}=schema.validate(req.body);
    if(error){
        return res.status(400).json({
            message:"bad request", error,
            success:false
        })
    }
    next()
}


const protect = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: "Token nahi mila"
        });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            message: "Invalid token format"
        });
    }

    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();

    } catch (error) {

        return res.status(401).json({
            message: "Invalid token"
        });
    }
};

module.exports={SingupValidation,loginValidation,protect}