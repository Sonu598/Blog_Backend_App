const jwt=require('jsonwebtoken');
const { BlacklistModel } = require('../model/blacklistmodel');
const { UserModel } = require('../model/usermodel');
const { model } = require('mongoose');


const authenticate=async(req,res,next)=>{
    try {
        const token=req.cookies.token;
        const isBlacklisted=await BlacklistModel.findOne({token});
        if (isBlacklisted){
            res.send('Token is Blacklisted');
        } else {
            const decodetoken=jwt.verify(token,'Secret');
            const {userID}=decodetoken;
            const user=await UserModel.findById(userID);
            if (!user) {
                res.send('Please Login');
            }
            req.user=user;
            next();
        }
    } catch (err) {
        res.send(err.message);
    }
}

module.exports={
    authenticate
}