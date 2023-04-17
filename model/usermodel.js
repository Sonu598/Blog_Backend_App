const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    name:String,
    email:{
        type:String,
        unique:true
    },
    password:String,
    role:{
        type:String,
        enum:['User','Moderator'],
        default:'User'
    }
})

const UserModel=mongoose.model('Users',userSchema);

module.exports={
    UserModel
}