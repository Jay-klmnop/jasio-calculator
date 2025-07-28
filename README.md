# Jasio Calculator - A Pixel JavaScript Calculator

A retro-themed calculator built with vanilla JavaScript, HTML, and CSS, focusing on clean state management and modern DOM manipulation techniques.

---

[Image of Jasio Calculator](/demo/calculator-jasio.png)

**[View the Live Demo Here](https://jay-klmnop.github.io/jasio-calculator/)**

---

## Introduction

The Jasio Calculator is a personal project built to practice and solidify core JavaScript fundamentals. The goal was to move beyond a simple implementation to create a robust, well-structured application with a distinct pixel-art aesthetic.

This project was initially built as an early exercise and was later refactored to incorporate more advanced, professional development patterns.

## Features

- **Full Basic Functionality:** Supports addition, subtraction, multiplication, and division.
- **State Management:** Utilizes a single, consolidated state object to manage the application's state, improving clarity and preventing bugs.
- **Efficient Event Handling:** Uses a single, delegated event listener on the main keypad for optimal performance and cleaner code.
- **Pixel Art Design:** A custom, retro-inspired visual theme with a pixel-art font and color palette.
- **Responsive Layout:** The calculator is fully responsive and functional on both desktop and mobile devices.

## Key Learnings and Code Highlights

This project served as a deep dive into several key professional development practices.

### State Management Refactor

The initial implementation used multiple independent variables to track state. The project was refactored to use a single state object, which made the code significantly easier to debug and reason about.

Before (Multiple Variables):

```javascript
let firstValue = "";
let operator = "";
let isWaitingForSecondValue = false;
```

After (Single State Object):

```javascript
const calculator = {
  displayValue: "0",
  firstValue: null,
  operator: null,
  isWaitingForSecondValue: false,
};
```

## Event Delegation

Instead of attaching an event listener to every button, a single listener was attached to the parent .buttons container. This is a more performant and scalable pattern that simplifies the code by using a central point to handle all user input.

```javascript
const calculatorButtons = document.querySelector(".buttons");

calculatorButtons.addEventListener("click", (event) => {
  // Logic to handle clicks based on event.target
});
```
