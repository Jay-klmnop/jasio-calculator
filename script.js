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
        if (isWaitingForSecondValue) {
            display.value = button.textContent;
            isWaitingForSecondValue = false;
        } else {
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
    console.log('= 버튼 클릭됨!');
     const secondValue = display.value; // secondValue를 여기서 선언

    // 계산 직전에 모든 재료를 출력해보자
    console.log('첫 번째 값 (firstValue):', firstValue);
    console.log('연산자 (operator):', operator);
    console.log('두 번째 값 (secondValue):', secondValue);
    
    if (!firstValue || !operator) {
        console.log('계산에 필요한 값이 부족하여 중단합니다.');
        return;
    }
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
