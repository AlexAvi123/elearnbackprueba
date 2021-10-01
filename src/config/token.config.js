const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");

module.exports.confirmToken = async (req, res, next)=>{
    const strToken = req.headers.token;
    if(!strToken){
        return res.json({ msj: "Token no encontrado" });
    }
    try {
        const key = jwt.verify(strToken, process.env.SECRET)
        const user = await User.findOne({ mail: key.mail });
        if(!user){
            return res.json({ msj: "User no encontrado" });
        }
    } catch (error) {
       // return res.json({ msj: "error" });
        return res.json(error);
    }
    next();
}