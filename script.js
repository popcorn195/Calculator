document.addEventListener('DOMContentLoaded', () => {
    //It ensures that the JavaScript code inside the event listener runs only after the HTML document is fully available.
    const display = document.querySelector("#display");
    const buttons = document.querySelectorAll("button");
    const themeToggleBtn = document.querySelector(".theme-toggler");
    const calculator = document.querySelector(".calculator");

    // Function to safely evaluate the expression
    function safeEval(expression) {
        try {
            // Handle percentages and make sure we replace `%` with `/100` before evaluation
            expression = expression.replace(/%/g, '/100');
            return new Function('return ' + expression)();
        } 
        catch (e) {
            //If an error occurs in the try block, control is transferred to the catch block, where e represents the error object.
            return "Error";
        }
    }

    // Event listener for button clicks
    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            const id = button.id;

            if (id === "C") {
                display.innerText = "";
            } 
            else if (id === "backspace") {
                display.innerText = display.innerText.slice(0, -1);
                //Extracts all characters from the beginning (0) up to (but not including) the last character (-1)
            } 
            else if (id === "=") {
                if (display.innerText.trim() !== "") {
                    //Cleans up any leading or trailing whitespace characters
                    display.innerText = safeEval(display.innerText);
                } 
                else {
                    display.innerText = "Empty!";
                    setTimeout(() => (display.innerText = ""), 2000);
                    //The function clears the text content of the display element after2000 milliseconds (2 seconds).
                }
            } 
            else {
                // Handling special cases for `.` and `()`
                if (id === 'dot') {
                    // Prevent multiple dots in a single number
                    const text = display.innerText;
                    const lastNumber = text.split(/[\+\-\*\/\(\)]/).pop();
                    //Splits the string text at each occurrence of the characters +, -, *, /, (, or ).
                    //.pop(): Retrieves the last element of the resulting array, which represents the last numeric segment in the expression.
                    if (!lastNumber.includes('.')) {
                        display.innerText += '.';
                    }
                } 
                else if (id === '()') {
                    // Toggle parentheses
                    const text = display.innerText;
                    const openCount = (text.match(/\(/g) || []).length;
                    const closeCount = (text.match(/\)/g) || []).length;
                    //text.match(/\(/g): Finds all occurrences of the opening parenthesis (() in text. The regular expression /\(/g matches every ( in the string.
                    //|| []: If match() returns null (no matches found), it defaults to an empty array.
                    //.length: Counts the number of matches found. It indicates how many opening parentheses are present in text.

                    if (openCount === closeCount || closeCount > openCount) {
                        // Add opening parenthesis if balanced or more closing
                        display.innerText += '(';
                    } 
                    else {
                        // Add closing parenthesis if more opening
                        display.innerText += ')';
                    }
                } 
                else {
                    // Regular button handling
                    display.innerText += id;
                }
            }
        });
    });

    // Event listener for theme toggling
    themeToggleBtn.addEventListener('click', () => {
        calculator.classList.toggle("dark");
        themeToggleBtn.classList.toggle("active");
    });
});