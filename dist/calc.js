function calc(str) {
    const stack = [];
    const tokens = str.split(" ");
    const k = 0;
    for (let i = tokens.length - 1; i >= 0; i--) {
        const token = tokens[i];
        if (token === "+" || token === "-" || token === "*" || token === "/") {
            const operand1 = stack.pop();
            const operand2 = stack.pop();
            if (operand1 === undefined || operand2 === undefined) {
                console.log("Неправильное выражение");
                return;
            }
            if (token === "+") {
                stack.push(operand1 + operand2);
            }
            else if (token === "-") {
                stack.push(operand1 - operand2);
            }
            else if (token === "*") {
                stack.push(operand1 * operand2);
            }
            else if (token === "/") {
                stack.push(operand1 / operand2);
            }
        }
        else {
            const number = parseInt(token);
            if (!isNaN(number)) {
                stack.push(number);
            }
            else {
                console.log("Неправильное выражение");
                return;
            }
        }
    }
    if (stack.length === 1) {
        console.log("Результат: " + stack[0]);
    }
    else {
        console.log("Неправильное выражение");
    }
}
calc("/ 5 0");
export {};
