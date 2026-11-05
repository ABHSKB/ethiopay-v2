const errorHandler= (err,req,res,next)=>{
    console.error(err);

    if(err.type === "entity.parse.failed"){
        return res.status(400).json({
            error: "Invalid JSON format"
        });
    }
    res.status(500).json({
        error: "Internal server error"
    });

}

module.exports=errorHandler;