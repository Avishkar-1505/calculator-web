function add(a, b){
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a/b;
}

const maxDigits = 11;

let operand1 = null;
let operand2 = null;
let displayVal = "0";

let isFloat = false;
let isNeg = false; 

let operator = null;


const display = document.querySelector("#display");
display.innerHTML = displayVal;

const operands = document.querySelectorAll(".operand");

const clear = document.querySelector("#clear");

const equals = document.querySelector(".equals");

const operators = document.querySelectorAll(".operator"); 

const changeSign = document.querySelector("#changeSign");

const backspace = document.querySelector("#backspace");

backspace.addEventListener("click", ()=>{
    displayVal = displayVal.slice(0, -1);
    console.log(displayVal);
    display.innerHTML = displayVal;
})

changeSign.addEventListener("click", ()=>{
    if(displayVal.length <= maxDigits && isNeg){
        displayVal = displayVal.slice(1);
        display.innerHTML = displayVal;
        isNeg = false;
    }
    else if(displayVal.length < maxDigits && !isNeg){
        displayVal = '-' + displayVal;
        display.innerHTML = displayVal;
        isNeg = true;
    }

})



equals.addEventListener("click", (e)=>{
    if(operand1!==null && operator!==null && displayVal!==''){
        operand2 = Number(displayVal);
        let res = operate(operator, operand1, operand2);
        // console.log(res)
        let minExp = 6;
        while(res.length >= maxDigits && minExp>=1){
            // console.log(Number(res).toExponential(minExp).toString());
            res = Number(res).toExponential(minExp).toString();
            minExp--;
        }
        if(res<0){
            isNeg = true;
        }
        displayVal = res;
        display.innerHTML = displayVal;
        operand1 = Number(res);
        operand2 = null;
        operator = null;
        displayVal = '';
    }
})

clear.addEventListener("click", ()=>{
    displayVal = '0';
    operand1 = null;
    operand2 = null;
    operator = null;
    display.innerHTML = displayVal;
    isNeg = false;
})



operands.forEach((opr)=>{
    opr.addEventListener("click", (e)=>{
        if(operand1!==null && operator===null){
            operand1=null;
        }

        if(displayVal.length >= maxDigits){
            return;
        }

        if(e.target.innerHTML === '.' && isFloat===false){
            isFloat = true;
            displayVal += '.';
            
        }
        else if(e.target.innerHTML !== '.'){
            if(displayVal==='0'){
                displayVal = e.target.innerHTML;
            }
            else{
                displayVal += e.target.innerHTML;
            }
            
        }
        display.innerHTML = displayVal;
    })
})


operators.forEach((op)=>{
    op.addEventListener("click", (e)=>{
        if(operand1!==null && operand2===null && operator!==null && displayVal!==''){
            operand2 = Number(displayVal);
            let res = operate(operator, operand1, operand2);
            let minExp = 6;
            while(res.length >= maxDigits && minExp>=1){
                // console.log(Number(res).toExponential(minExp).toString());
                res = Number(res).toExponential(minExp).toString();
                minExp--;
            }
            if(res<0){
                isNeg = true;
            }
            displayVal = res;
            display.innerHTML = displayVal;
            operand1 = Number(res);
            operand2 = null;
            operator = e.target.innerHTML;
            displayVal = '';
        }
        else if(operand1===null && operand2===null){
            operand1 = Number(displayVal);
            operator = e.target.innerHTML;
            displayVal = '';
        }
        else if(operand1!==null && operator===null && operand2===null){
            operator = e.target.innerHTML;
            displayVal = '';
        }
    })
})







function operate(operator, num1, num2) {
    if(operator=='+'){
        return add(num1, num2).toString();
    }
    else if(operator=='-'){
        return subtract(num1, num2).toString();
    }
    else if(operator=='*'){
        return multiply(num1, num2).toString();
    }
    else if(operator=='/'){
        return divide(num1, num2).toString();
    }

    return 0;
}
