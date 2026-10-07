const express = require("express");

const router = express.Router();

const validateSalary = require("../middleware/validateSalary");
const calculateSalaryController = require("../controllers/salaryController");
const taxBrackets = require("../data/taxBrackets");
const salaryHistory = require("../data/salaryHistory");

router.post("/calculate",validateSalary.validateSalary,calculateSalaryController.calculateSalaryController);

router.get("/brackets",(req,res)=>{
    res.json(taxBrackets);
});

router.get("/history",(req,res)=>{
    const type=req.query.type;
    let page= Number(req.query.page);
    let limit=Number(req.query.limit);
    let history
    if(!type){
        history = salaryHistory;
    }else if(type === "gross-to-net" || type === "net-to-gross"){
        history = salaryHistory.filter(salary => salary.type === type);
    }else{
        res.status(400).json({
            error: "Invalid history type"
        });
        return;
    }  

    if(req.query.page === undefined){
        page=1;
    }
    if(req.query.limit === undefined){
        limit=10;
    }
    if(!Number.isFinite(page)|| page <=0 || !Number.isFinite(limit)|| limit <=0 || limit >100){
        res.status(400).json({
            error: "invalid page or limit"
        });
        return;  
    }
    const index = (page-1)*limit;
    const total = history.length;
    const data = history.slice(index,limit+index);

    res.status(200).json({
        page,
        limit,
        total,
        data
    });

});



router.get("/history/:id",(req,res)=>{
    const id = Number(req.params.id);
    const history = salaryHistory.find(salary => salary.id === id);
    if(history){
        res.status(200).json(history);
    }else{
        res.status(404).json({
            error: "History record not found"
        });
    }
});

router.delete("/history",(req,res)=>{
    salaryHistory.splice(0, salaryHistory.length);
    res.status(200).json({
        message: "Removed all history"
    });

});

router.delete("/history/:id", (req, res) => {
    const id = Number(req.params.id);

    const index = salaryHistory.findIndex(salary => salary.id === id);

    if (index === -1) {
        return res.status(404).json({
            error: "History record not found"
        });
    }

    salaryHistory.splice(index, 1);

    res.status(200).json({
        message: "History record deleted"
    });
});

router.post("/net-to-gross", validateSalary.validateNetSalary ,calculateSalaryController.calculateGrossFromNetController);

module.exports=router;
