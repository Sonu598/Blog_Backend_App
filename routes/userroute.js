const express=require('express');
const userRouter=express.Router();
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const cookieParser=require('cookie-parser');
const { UserModel } = require('../model/usermodel');
const { BlacklistModel } = require('../model/blacklistmodel');


userRouter.post('/signup', async(req,res)=>{
    const {name,email,password,role}=req.body;
    try {
        bcrypt.hash(password,5,async function(err,hash) {
            if (err) {
                res.send(err.message);
            } else {
                const user=new UserModel({name,email,password:hash,role});
                await user.save();
                res.send('Signup Successful');
            }
        })
    } catch (err) {
        res.send(err.message);
    }
})

userRouter.post("/login",async(req,res)=>{
    const{email,password}=req.body;
    try {
        const user =await userModel.find({email})
        if(user){
            bcrypt.compare(password,user[0].password,function (err,result){
                if(result){
                    var token=jwt.sign({userID:user[0]._id},"Secret",{expiresIn:60})
                    var refresh_token=jwt.sign({userID:user[0]._id},"Secret",{expiresIn:60})

                    res.cookie("token",token)
                    res.cookie("refresh_token",refresh_token)

                    res.send({"msg":"Login successful","token":token,"refresh_token":refresh_token})
                }else{
                    res.send("wrong credentials")
                }
            })
        }else{
            res.send("wrong credentials")
        }
    } catch (err) {
        res.send(err.message);
    }
})

userRouter.post("/logout",async(req,res)=>{
    try {
        const token=req.cookies.token
        const blacklistedToken=new BlacklistModel({token})
        await blacklistedToken.save()

        res.send("Logged out successful")
    } catch (err) {
        res.send(err.message);
    }
})

userRouter.get("/refresh",(req,res)=>{
    const refresh_token=req.cookies.refresh_token
    if(!refresh_token){
        res.send({"msg":"Please login"})
    }else{
        jwt.verify(refresh_token,"masai1",(err,decoded)=>{
            if(err){
                res.send({"msg":"pls login3"})
            }else{
               var token=jwt.sign({userID:decoded.userID},"Secret",{expiresIn:60})
               res.cookie("token",token)
               res.send({"msg":"login successfull","token":token})
            }
        })
    }

})

module.exports={
    userRouter
}