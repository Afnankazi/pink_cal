# Simple Black Calculator

A sleek, minimalistic calculator with a black background, built purely with HTML, CSS, and JavaScript. This project demonstrates fundamental web development skills in creating an interactive user interface.

## Features

*   Basic arithmetic operations: addition, subtraction, multiplication, division.
*   Percentage calculation.
*   Number negation (+/-).
*   Clear (AC) functionality.
*   Clean, modern black-themed UI.

## File Structure

```
.
├── index.html
├── style.css
├── script.js
├── package.json
└── README.md
```

## Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/simple-black-calculator.git
    cd simple-black-calculator
    ```

2.  **No dependencies to install.** This is a pure client-side application.

## Setup Commands

There are no specific setup commands required beyond cloning the repository.

## How to Run the Project

You can run this project in two simple ways:

1.  **Open `index.html` directly:**
    Navigate to the project directory in your file explorer and double-click `index.html`. It will open in your default web browser.

2.  **Using `npm start` (if Node.js is installed):**
    If you have Node.js installed, you can use the predefined `start` script:
    ```bash
    npm start
    ```
    This command will attempt to open `index.html` in your default web browser (may require a browser to be set as default for `.html` files).

## How to Use the Calculator

*   **Numbers:** Click on the number buttons (0-9) to input digits.
*   **Decimal:** Click the `.` button to add a decimal point.
*   **Operators:** Click `+`, `-`, `*`, `/` to select an arithmetic operation. The calculator will perform the pending operation if one exists.
*   **Equals:** Click `=` to get the result of the current calculation.
*   **Clear (AC):** Click `AC` to clear the current input and reset the calculator.
*   **Negate (+/-):** Click `+/-` to change the sign of the current number.
*   **Percentage (%):** Click `%` to convert the current number to its percentage value (e.g., 50 becomes 0.5).

## How to Run Tests

This project does not include any automated tests.

## Environment Variables

No environment variables are needed for this project.

## Additional Notes

*   The calculator processes operations sequentially. For example, `1 + 2 * 3` will first calculate `1 + 2 = 3`, and then if you press `* 3 =`, it will calculate `3 * 3 = 9`. It does not follow the mathematical order of operations (PEMDAS/BODMAS).
*   Division by zero will display "Error".
*   The UI is designed to be straightforward and intuitive.