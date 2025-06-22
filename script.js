const display = document.querySelector('#display');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const clearButton = document.querySelector('#clear-btn');
const backspaceButton = document.querySelector('#backspace-btn');
const equalsButton = document.querySelector('#equals-btn');

let firstValue = '';
let operator = '';
let isWaitingForSecondValue = false;

function operate(first, operator, second) {
    const a = parseFloat(first);
    const b = parseFloat(second);
    switch (operator) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            return b === 0 ? 'Error' : a / b;
        default:
            return null;
    }
}

document.querySelectorAll('.number').forEach(button => {
    button.addEventListener('click', () => {
        if (button.textContent === '.' && display.value.includes('.')) {
            return; 
        }
        if (isWaitingForSecondValue) {
            display.value = button.textContent;
            isWaitingForSecondValue = false;
        } else {
            if (display.value.length >= 16) return;
            display.value = display.value === '0' ? button.textContent : display.value + button.textContent;
        }
    });
});

document.querySelectorAll('.operator').forEach(button => {
    button.addEventListener('click', () => {
        if (firstValue && operator) {
            const secondValue = display.value;
            const result = operate(firstValue, operator, secondValue);
            display.value = result;
            firstValue = result;
        } else {
            firstValue = display.value;
        }
        operator = button.textContent.trim();
        isWaitingForSecondValue = true;
    });
});

equalsButton.addEventListener('click', () => {
    if (!firstValue || !operator) return;
    const secondValue = display.value;
    const result = operate(firstValue, operator, secondValue);
    display.value = result;
    firstValue = result;
    operator = '';
    isWaitingForSecondValue = true;
});

clearButton.addEventListener('click', () => {
    display.value = '0';
    firstValue = '';
    operator = '';
    isWaitingForSecondValue = false;
});

backspaceButton.addEventListener('click', () => {
    display.value = display.value.slice(0, -1) || '0';
});
