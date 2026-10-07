const { calculatePension, calculateIncomeTax, calculateGrossFromNet } = require("../utils/salaryCalculator");

function calculateSalary(grossSalary){
    const pension = calculatePension(grossSalary);

    const taxableIncome = grossSalary - pension;

    const taxResult = calculateIncomeTax(taxableIncome);

    const netSalary = taxableIncome - taxResult.incomeTax;

    return {
        grossSalary,
        pension,
        taxableIncome,
        incomeTax: taxResult.incomeTax,
        netSalary,
        taxRate: taxResult.rate,
        taxDeduction: taxResult.deduction
    }
}

function calculateGrossFromNetService(netSalary){
    const result=calculateGrossFromNet(netSalary);
    return result;
}

module.exports={
    calculateSalary,
    calculateGrossFromNetService
};