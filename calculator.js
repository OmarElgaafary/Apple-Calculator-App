const calculatorOuterContainer = document.querySelector('.calculator-outer-container');
const calculatorButtons = document.querySelectorAll('.calculator-button');
const calculatorResultElement = document.querySelector('.calculator-result');

let firstNumber = '';
let secondNumber = '';
let operatorApplied = false;
let operatorButton;
let resultNum;

calculatorButtons.forEach((button) => {
    button.addEventListener('click', () => {
        let buttonVal = button.dataset.buttonValue;
        handleCalculation(buttonVal);
    });
});

function handleCalculation(button) {
    //check if first number is finished
    // if its finished by applying an operator start applying to the secod number
    // if the user presses equal, calculate result and display it

    switch (button) {
        case '/':
            if (!firstNumber && resultNum)
            {
                firstNumber = String(resultNum);
            }
            operatorButton = '/';
            operatorApplied = true;
            return;
        case '*':
            if (!firstNumber && resultNum)
            {
                firstNumber = String(resultNum);
            }
            operatorButton = '*';
            operatorApplied = true;
            return;
        case '-':
            if (!firstNumber && resultNum)
            {
                firstNumber = String(resultNum);
            }
            operatorButton = '-';
            operatorApplied = true;
            return;
        case '+':
            if (!firstNumber && resultNum)
            {
                firstNumber = String(resultNum);
            }
            operatorButton = '+';
            operatorApplied = true;
            return;
        case '=':
            if (operatorButton == '+') {
                resultNum = Number(firstNumber) + Number(secondNumber);
                calculatorResultElement.innerHTML = resultNum;
                resetValues();
                console.log(resultNum);
            }
            if (operatorButton == '-') {
                resultNum = Number(firstNumber) - Number(secondNumber);
                calculatorResultElement.innerHTML = resultNum;
                resetValues();
                console.log(resultNum);
            }
            if (operatorButton == '*') {
                resultNum = Number(firstNumber) * Number(secondNumber);
                calculatorResultElement.innerHTML = resultNum;
                resetValues();
                console.log(resultNum);
            }
            if (operatorButton == '/') {
                resultNum = Number(firstNumber) / Number(secondNumber);
                calculatorResultElement.innerHTML = resultNum;
                resetValues();
                console.log(resultNum);
            }
            
            return;
        case 'AC':
            calculatorResultElement.innerHTML = '';
            resetValues();
            return;
        case 'sign':

            if (resultNum) {
                resultNum = -resultNum;
                calculatorResultElement.innerHTML = resultNum;
            }
            
            if (!secondNumber)
                firstNumber = -firstNumber;
            else
                secondNumber = -secondNumber;
            return;
        case '%':
            
    }

    if (!operatorApplied) {
        firstNumber += button;
        calculatorResultElement.innerHTML = firstNumber;
    }
    else {
        secondNumber += button;
        calculatorResultElement.innerHTML = secondNumber;
    }

}

function resetValues() {
    firstNumber = '';
    secondNumber = '';
    operatorApplied = false;
    operatorButton = '';
}

