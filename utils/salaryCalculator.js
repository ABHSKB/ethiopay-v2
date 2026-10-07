const taxBrackets = require("../data/taxBrackets");

function calculatePension(grossSalary){
    const pension = grossSalary*0.07;

    return pension;
}

function calculateIncomeTax(taxableIncome){
    const taxBracket = taxBrackets.find(tax=> taxableIncome >= tax.min && (taxableIncome <= tax.max || tax.max === null));
    const incomeTax = Math.max(0, (taxableIncome * taxBracket.rate) - taxBracket.deduction);
    
    return {
            incomeTax,
            rate: taxBracket.rate,
            deduction: taxBracket.deduction,
            bracket: taxBracket
        };

}

function calculateGrossFromNet(netSalary){
    let taxRate;
    let taxDeduction;
    if (netSalary <=1860){
        taxRate = 0;
        taxDeduction = 0;
    }
    else if (netSalary>1860 && netSalary <=3420){
        taxRate = 0.15;
        taxDeduction = 300;
    }
    else if (netSalary>3420 && netSalary <=5610){
        taxRate = 0.20;
        taxDeduction = 500;
    }
    else if (netSalary>5610 && netSalary <=7650){
        taxRate = 0.25;
        taxDeduction = 850;
    }
    else if (netSalary>7650 && netSalary <=10170){
        taxRate = 0.30;
        taxDeduction = 1350;
    }
    else{
        taxRate = 0.35;
        taxDeduction = 2050;
    }

        
     const grossSalary =
        (netSalary - taxDeduction) /
        (0.93 * (1 - taxRate));

    const pension =calculatePension(grossSalary);

    const taxableIncome = grossSalary-pension;

    const taxResult = calculateIncomeTax(taxableIncome);

    return{
        netSalary,
        grossSalary,
        pension,
        taxableIncome,
        incomeTax: taxResult.incomeTax,
        taxRate:taxResult.rate,
        taxDeduction:taxResult.deduction
    };

}

module.exports = {
    calculateIncomeTax,
    calculatePension,
    calculateGrossFromNet
};