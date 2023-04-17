const authorise=(permittedrole)=>{
    return (req,res,next)=>{
        const user_role=req.user.role;
        if (permittedrole.includes(user_roles)) {
            next();
        } else {
            res.send('You are Unathorised')
        }
    }
}

module.exports={
    authorise
}