const mongoose=require('mongoose');

const blogSchema=mongoose.Schema({
    title:String,
    content:String,
    author:String
})

const BlogModel=mongoose.model('Blogs',blogSchema);

module.exports={
    BlogModel
}