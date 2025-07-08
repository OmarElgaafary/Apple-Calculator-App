const calculatorOuterContainer = document.querySelector('.calculator-outer-container');
const calculatorButtons = document.querySelectorAll('.calculator-button');
const calculatorResultElement = document.querySelector('.calculator-result');

let calcNums = '';
let calcResult = '';

calculatorButtons.forEach((button) => {
    button.addEventListener('click', () => {
        let buttonVal = button.dataset.buttonValue;
        handleCalculation(buttonVal);
    });
});

function handleCalculation(button) {

    // check if incoming input is an integer is it is append it to the displayNumbers array
    // if more numbers are pressed they are still pushed to form a bigger number whilst updating that html

    //if an operator is inputed push it to the array and update it to the html

    //if the equals sign is pressed, calculate the total of array using eval() func

    // edge cases:

    // if you are inputing an equation and get the result of it, you can use that result as the starting value of another operation

    // if you calculate the value of an equation and you press another number, it should cancel the equation and start a new one

    let buttonValue = String(button);

    switch (buttonValue) {
        case '/':
            if (calcResult !== '') {
                calcNums = calcResult;
            }
            if (checkLastIndex) {
                calcNums += '/';
                calcDisplay();
            }
            console.log(calcNums);
            return;
        case '*':
            if (calcResult !== '') {
                calcNums = calcResult;
            }

            if (checkLastIndex()) {
                calcNums += '*';
                calcDisplay();
            }
            return;
        case '-':
            if (calcResult !== '') {
                calcNums = calcResult;
            }

            if (checkLastIndex()) {
                calcNums += '-';
                calcDisplay();
            }
            console.log(calcNums);
            return;
        case '+':
            if (calcResult !== '') {
                calcNums = Number(calcResult);
            }
            if (checkLastIndex()) {
                calcNums += '+';
                calcDisplay();
            }
            console.log(calcNums);
            return;
        case '=':
            if (checkLastIndex()) {
                calcResult = Number(eval(calcNums));
                calculatorResultElement.innerHTML = calcResult;
            }
            return;
        case 'AC':
            resetValues();
            return;
    }

    console.log(checkLastIndex())
    if (calcResult !== '' && checkLastIndex())
        resetValues();


    calcNums += buttonValue;
    calcDisplay();

    console.log(calcNums);
    console.log(calcNums.length);




}

function checkLastIndex() {
    if (checkSigns(calcNums[(calcNums.length) - 1]))
        return true;
    else
        return false;
}

function resetValues() {
    calculatorResultElement.innerHTML = calcResult = calcNums = '';
}

function calcDisplay() {
    let calcFormatted = calcNums;
    if (calcFormatted.includes('*')) {
        console.log('found');
        calcFormatted = calcFormatted.replaceAll('*', '×');
    }

    if (calcFormatted.includes('/')) {
        console.log('found');
        calcFormatted = calcFormatted.replaceAll('/', '÷');
    }

    calculatorResultElement.innerHTML = calcFormatted;
}


function checkSigns(sign) {
    if (sign === '/' || sign === '*' || sign === '-' || sign === '+')
        return false;
    else
        return true;
}