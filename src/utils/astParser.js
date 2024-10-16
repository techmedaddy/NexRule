// Utility to handle AST operations

// Define a basic AST Node structure
class Node {
    constructor(type, left = null, right = null, value = null) {
        this.type = type; // 'operator' or 'operand'
        this.left = left; // Left child (for operators)
        this.right = right; // Right child (for operators)
        this.value = value; // Value for operands (e.g., age > 30)
    }
}

// 1. Parse Rule String into AST
const parseRuleString = (ruleString) => {
    if (!ruleString || typeof ruleString !== 'string') {
        throw new Error('Invalid rule string provided.');
    }

    // Tokenize the string into individual components (e.g., age, >, 30, AND, salary, etc.)
    const tokens = tokenize(ruleString);

    // Convert tokens into an AST by building nodes and linking them.
    return buildAST(tokens);
};

// Tokenize the input rule string (a basic example, you can enhance it)
const tokenize = (ruleString) => {
    return ruleString
        .replace(/\(/g, ' ( ')
        .replace(/\)/g, ' ) ')
        .split(/\s+/)
        .filter(Boolean);
};

// Build the AST from the tokens
const buildAST = (tokens) => {
    let stack = [];

    // Helper to create operator nodes
    const createOperatorNode = (operator, left, right) => {
        return new Node('operator', left, right, operator);
    };

    // Parse through the tokens to construct the AST
    for (let token of tokens) {
        if (token === 'AND' || token === 'OR') {
            // It's an operator, combine previous nodes
            let right = stack.pop();
            let left = stack.pop();
            stack.push(createOperatorNode(token, left, right));
        } else if (token === '(') {
            // Open parentheses, do nothing (can enhance for complex parsing)
        } else if (token === ')') {
            // Close parentheses, do nothing (can enhance for complex parsing)
        } else {
            // It's an operand, create a node for the condition
            stack.push(new Node('operand', null, null, token));
        }
    }

    // The last element in the stack should be the root of the AST
    return stack.pop();
};

// 2. Combine multiple ASTs into a single AST
const combineASTs = (astList) => {
    if (astList.length === 0) return null;

    let combinedAST = astList[0];

    for (let i = 1; i < astList.length; i++) {
        combinedAST = new Node('operator', combinedAST, astList[i], 'AND');
    }

    return combinedAST;
};

// 3. Evaluate the AST against user data
const evaluateAST = (node, data) => {
    if (node.type === 'operand') {
        // Evaluate the condition stored in the operand node
        return evaluateCondition(node.value, data);
    } else if (node.type === 'operator') {
        // Recursively evaluate left and right children based on the operator
        let leftValue = evaluateAST(node.left, data);
        let rightValue = evaluateAST(node.right, data);

        if (node.value === 'AND') {
            return leftValue && rightValue;
        } else if (node.value === 'OR') {
            return leftValue || rightValue;
        }
    }
    return false; // If evaluation fails
};

// Evaluate individual condition (e.g., 'age > 30')
const evaluateCondition = (condition, data) => {
    const [key, operator, value] = condition.split(' ');

    // Convert value to a number if needed
    const numValue = isNaN(value) ? value : Number(value);

    // Check the operator and evaluate the condition
    switch (operator) {
        case '>': return data[key] > numValue;
        case '<': return data[key] < numValue;
        case '=': return data[key] === numValue || data[key] === value; // Supports strings
        default: return false;
    }
};

module.exports = {
    parseRuleString,
    combineASTs,
    evaluateAST,
};
