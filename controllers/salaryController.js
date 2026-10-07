const addHistory = require("../services/historyService");
const calculateSalary = require("../services/taxService");

const calculateSalaryController=(req,res, next)=>{
    try{
        const grossSalary = req.body.grossSalary;

        const result = calculateSalary.calculateSalary(grossSalary);

        addHistory("gross-to-net", grossSalary, result);

        res.status(200).json(result);

    }catch(err){
        next(err);
    }
}

const calculateGrossFromNetController=(req,res,next)=>{
    try{
        const netSalary = req.body.netSalary;

        const result = calculateSalary.calculateGrossFromNetService(netSalary);

        addHistory("net-to-gross", netSalary, result);

        res.status(200).json(result);
    }catch(err){
        next(err);
    }
}

module.exports={
    calculateSalaryController,
    calculateGrossFromNetController
};