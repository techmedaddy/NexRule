const { createRule, combineRules, evaluateRule } = require('../services/ruleService');

// POST /api/rule - Create a rule and return the AST
exports.createRule = async (req, res) => {
    try {
        const { ruleString } = req.body;

        // Validate ruleString
        if (!ruleString) {
            return res.status(400).json({ error: 'Rule string is required.' });
        }

        const ast = createRule(ruleString);
        // Save AST to database logic can be added here...

        res.status(201).json({ ast });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create rule: ' + error.message });
    }
};

// POST /api/combineRules - Combine multiple rules
exports.combineRules = async (req, res) => {
    try {
        const { rules } = req.body;

        // Validate rules
        if (!Array.isArray(rules) || rules.length === 0) {
            return res.status(400).json({ error: 'An array of rules is required.' });
        }

        const combinedAST = combineRules(rules);
        res.status(200).json({ combinedAST });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to combine rules: ' + error.message });
    }
};

// POST /api/evaluateRule - Evaluate a rule with user data
exports.evaluateRule = async (req, res) => {
    try {
        const { ast, userData } = req.body;

        // Validate AST and userData
        if (!ast || !userData) {
            return res.status(400).json({ error: 'AST and user data are required.' });
        }

        const result = evaluateRule(ast, userData);
        res.status(200).json({ result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to evaluate rule: ' + error.message });
    }
};
