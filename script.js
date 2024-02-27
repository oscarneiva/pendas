main();

function main() {
    setFocusToTextBox();
    // let question = document.getElementById('question');
    // let questionText = document.createTextNode("Let's start with a simple maths expression... Press enter!");
    // question.textContent = questionText.textContent;

    const inputField = document.getElementById('textfield');
    inputField.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            gameLoop();
        }
    });

    document.addEventListener("DOMContentLoaded", function() {
        const text = document.getElementById('question');
        const originalText = text.innerHTML;
        text.innerHTML = ''; // Clear original text

        let i = 0;
        const typingInterval = setInterval(function() {
            if (i < originalText.length) {
                text.innerHTML += originalText.charAt(i);
                i++;
            } else {
                clearInterval(typingInterval);
            }
        }, 50);
    });
}

function gameLoop() {
    //let expression = generateExpression();
    expressions = ["3+7*5", "20-4*5", "20+20/5", "3-6*8", "8+4/2", "4-20/2", "20-4*5", "20+4/2", "3-10/2", "3+2*7"];
    let expression = randomElement(expressions)

    let answer = calculateAnswer(expression);
    if (answer === "Invalid expression") {
        console.log("Error...");
    }

    let question = document.getElementById('question');
    let questionText = document.createTextNode("Solve the expression: " + expression);
    question.textContent = questionText.textContent;
    let userInput = "";

    const inputField = document.getElementById('textfield');
    inputField.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            userInput = inputField.value;
            if (answer == userInput && userInput != ""){
                questionText = document.createTextNode("Well done!");
                question.textContent = questionText.textContent;
            }else if (calculateWrongAnswer(expression) == userInput && userInput != ""){
                questionText = document.createTextNode("Ops... That's a very common mistake! The operations on the left don't have any priority over the ones on the right. Remember to follow PEMDAS.");
                question.textContent = questionText.textContent;
            }else if (userInput != ""){
                questionText = document.createTextNode("Oh no! Try again with another expression and remember to follow PENDAS");
                question.textContent = questionText.textContent;
            }
            inputField.value = "";
            document.addEventListener("keydown", function(event) {
                if (event.keyCode === 13) {
                    location.reload();
                }
            });
        }
    });
}

function generateExpression() {
    let expression = "";
    let operators = ["+", "-", "*", "/"];
    let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    //let length = Math.floor(Math.random() * 5) + 3;
    let length = 3;
    for (let i = 0; i < length; i++) {
        expression += randomElement(numbers);
        if (i < length - 1) {
            expression += randomElement(operators);
        }
    }
    return expression;
}

function setFocusToTextBox(){
    document.getElementById("textfield").focus();
}

function randomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function calculateAnswer(expression) {
    try {
        return eval(expression);
    } catch (error) {
        return "Invalid expression";
    }
}

function calculateWrongAnswer(expression) {
    expression = splitStringWithOperators(expression);
    let result = expression[0];
    for (let i = 0; i < expression.length; i++) {
        if (expression[i] === "+"){
            result += parseFloat(expression[i+1]);
        } else if (expression[i] === "-"){
            result -= parseFloat(expression[i+1]);
        } else if (expression[i] === "*"){
            result *= parseFloat(expression[i+1]);
        } else if (expression[i] === "/"){
            result /= parseFloat(expression[i+1]);
        }
    }
    return result;
}

function splitStringWithOperators(expression) {
    return expression.split(/([\+\-\*\/])/).filter(part => part.trim() !== '');
}