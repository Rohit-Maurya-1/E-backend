module.exports=(req,res,err,next)=>{
    if(err){
       return res.status(500).send({
          status:false,
          message:"server network error",
          response:{}
        })
    }
    next()
}