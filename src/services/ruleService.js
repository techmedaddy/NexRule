const { parseRuleString, combineASTs, evaluateAST } = require('../utils/astParser');

exports.createRule = (ruleString) => {
    return parseRuleString(ruleString);
};

exports.combineRules = (rules) => {
    return combineASTs(rules);
};

exports.evaluateRule = (ast, data) => {
    return evaluateAST(ast, data);
};
