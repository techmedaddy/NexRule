const { parseRuleString, combineASTs, evaluateAST } = require('../src/utils/astParser');

// Sample test data
const ruleString1 = "age > 30 AND salary > 50000";
const ruleString2 = "experience > 5 OR department = 'Sales'";
const userData = { age: 35, salary: 60000, experience: 6, department: 'Sales' };

describe('NexRule AST Logic Tests', () => {
  test('parseRuleString should create an AST from rule string', () => {
    const ast = parseRuleString(ruleString1);
    expect(ast).toBeDefined();
    expect(ast.type).toBe('operator'); // Ensure root is an operator
  });

  test('combineASTs should combine multiple ASTs into one', () => {
    const ast1 = parseRuleString(ruleString1);
    const ast2 = parseRuleString(ruleString2);
    const combinedAST = combineASTs([ast1, ast2]);
    
    expect(combinedAST).toBeDefined();
    expect(combinedAST.type).toBe('operator'); // Combined should also be an operator
  });

  test('evaluateAST should return true for valid user data', () => {
    const ast = parseRuleString(ruleString1);
    const result = evaluateAST(ast, userData);
    expect(result).toBe(true); // User meets the rule
  });

  test('evaluateAST should return false for invalid user data', () => {
    const invalidUserData = { age: 25, salary: 30000 };
    const ast = parseRuleString(ruleString1);
    const result = evaluateAST(ast, invalidUserData);
    expect(result).toBe(false); // User does not meet the rule
  });
});
