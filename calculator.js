const calculatorOuterContainer = document.querySelector('.calculator-outer-container');
const calculatorButtons = document.querySelectorAll('.calculator-button');
const calculatorResultElement = document.querySelector('.calculator-result');

let calcNums = '';
let calcResult = '';
let calcNumsDisplay = '';

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
            if (calcResult !== '' && !calcNums) {
                calcNums = calcNumsDisplay = calcResult;
            }
            if (checkLastIndex) {
                calcNums += '/';
                calcNumsDisplay += '÷';
                calcDisplay();
            }
            return;
        case '*':
            if (calcResult !== '' && !calcNums) {
                calcNums = calcNumsDisplay = calcResult;
            }

            if (checkLastIndex()) {
                calcNums += '*';
                calcNumsDisplay += '×';
                calcDisplay();
            }
            return;
        case '-':
            if (calcResult !== '' && !calcNums) {
                calcNums = calcNumsDisplay = calcResult;
            }

            if (checkLastIndex()) {
                calcNums += '-';
                calcNumsDisplay += '-';
                calcDisplay();
            }
            return;
        case '+':
            if (calcResult !== '' && !calcNums) {
                calcNums = calcNumsDisplay = calcResult;
            }
            if (checkLastIndex()) {
                calcNums += '+';
                calcNumsDisplay += '+';
                calcDisplay();
            }
            return;
        case '=':
            if (checkLastIndex()) {
                calcResult = Number(eval(calcNums));
                calcNums = '';
                calculatorResultElement.innerHTML = calcResult;
            }
            return;
        case 'AC':
            resetValues();
            return;
        case '%':

            if (checkLastIndex()) { // there isn't an operator at the end
                let [num1, index] = findNumberBefore();
                console.log(num1, index)
                if (index) {
                    let num2 = findNumberAfter(index);
                    calcNums = calcNums.slice(0, index + 1)
                    calcNums += `${num2}*(${num1}/100)`;
                    calcNumsDisplay += '%';
                    console.log(calcNums);
                }
                else {
                    calcNums = `(${num1}/100)`;
                    calcNumsDisplay = `${num1}%`
                }
            }
            calcDisplay();
            return;
        case 'sign':

            calcNums = numsSign(calcNums);
            calcNumsDisplay = numsSign(calcNumsDisplay);
            calcDisplay();

            return;
    }

    if (calcResult !== '' && checkLastIndex())
        resetValues();

    calcNums += buttonValue;
    calcNumsDisplay += buttonValue;
    calcDisplay();

}

function checkLastIndex() {
    if (checkSigns(calcNums[(calcNums.length) - 1]))
        return true;
    else
        return false;
}

function resetValues() {
    calculatorResultElement.innerHTML = calcResult = calcNums = calcNumsDisplay = '';
}

function calcDisplay() {
    calculatorResultElement.innerHTML = calcNumsDisplay;
}


function checkSigns(sign) {
    if (sign === '/' || sign === '*' || sign === '-' || sign === '+')
        return false;
    else
        return true;
}

function findNumberBefore() {
    let numFound = '';
    for (let i = calcNums.length - 1; i >= 0; i--) {
        if (checkSigns(calcNums[i]) && calcNums[i]) {
            numFound += calcNums[i];
        }
        else if (!checkSigns(calcNums[i])) {
            numFound = reverseString(numFound);
            return [numFound, i];
        }
    }

    numFound = reverseString(numFound);
    return [numFound];
}

function findNumberAfter(opIndex) {
    let numFound = '';
    for (let i = opIndex - 1; i >= 0; i--) {
        if (checkSigns(calcNums[i])) {
            numFound += calcNums[i];
        }
        else {
            numFound = reverseString(numFound);
            return numFound;
        }
    }
    numFound = reverseString(numFound);
    return numFound;
}

function reverseString(string) {
    return string.split('').reverse().join('');
}

function numsSign(nums) {
    let result;
    for (let i = nums.length - 1; i >= 0; i--) {
        let char = nums[i];
        if (char === '+' || char === '-') {
            result =
                char === '+'
                    ? nums.slice(0, i) + '-' + nums.slice(i + 1, nums.length)
                    : nums.slice(0, i) + '+' + nums.slice(i + 1, nums.length);
            return result;
        }
    }
    return '-' + nums;
}