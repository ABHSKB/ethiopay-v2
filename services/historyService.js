const salaryHistory = require("../data/salaryHistory")

function addHistory(type,input , result){

    const largest = salaryHistory.reduce((accumulator, currentValue) => {
        if(accumulator<currentValue){
            accumulator=currentValue;
        }

        return accumulator;
    },0);
    const history= {
        id: largest+1,
        type: type,
        input: input,
        result: result,
        createdAt: new Date().toISOString()
    }

    salaryHistory.push(history);
    return history;

}

module.exports=addHistory;

