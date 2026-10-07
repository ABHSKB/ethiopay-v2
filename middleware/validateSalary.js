const validateSalary= (req,res,next)=>{
    const grossSalary=(req.body).grossSalary;
    if(!grossSalary || !Number.isFinite(grossSalary) || grossSalary <=0){
        res.status(400).json({
            message: "invalid input"
        });
    }else{
        next();
    }
}

const validateNetSalary= (req,res,next)=>{
    const netSalary=(req.body).netSalary;
    if(!netSalary || !Number.isFinite(netSalary) || netSalary <=0){
        res.status(400).json({
            message: "invalid input"
        });
    }else{
        next();
    }
}

module.exports ={ 
    validateSalary,
    validateNetSalary
};