const express=require('express');
const blogRouter=express.Router();
const { BlogModel } = require('../model/blogmodel');
const { authorise } = require('../middleware/authorise');

blogRouter.get('/',authorise(['User','Moderator']),async(req,res)=>{
    const blogs=await BlogModel.find();
    res.send(blogs);
})

blogRouter.post('/createblog',authorise(['User']), async(req,res)=>{
    const payload=req.body;
    try {
        const blog=BlogModel(payload);
        await blog.save();
        res.send('New Blog has been Posted')
    } catch (err) {
        res.send(err.message);   
    }
})

blogRouter.delete('deleteblog/:id',authorise(['User','Moderator']),async(req,res)=>{
    const blogID=req.params.id;
    const blog=await BlogModel.findOne({_id:blogID});
    const userID_in_blog=blog.userID_in_blog;
    const userID_making_req=req.body.user;
    try {
        if (userID_making_req!==userID_in_blog) {
            res.send('You are not Authorised');
        } else {
            await BlogModel.findByIdAndDelete({_id:blogID});
            res.send('BBlog has been Deleted');
        }
    } catch (err) {
        res.send(err.message);
    }
})

module.exports={
    blogRouter
}