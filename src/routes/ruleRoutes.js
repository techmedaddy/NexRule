const express = require('express');
const { createRule, combineRules, evaluateRule } = require('../controllers/ruleController');
const router = express.Router();

router.post('/rule', createRule);
router.post('/combineRules', combineRules);
router.post('/evaluateRule', evaluateRule);

module.exports = router;
