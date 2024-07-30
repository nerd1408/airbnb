const { body, validationResult } = require('express-validator');

module.exports = {
  validateRegister() {
    return [
      body('username').isLength({ min: 3 }),
      body('email').isEmail(),
      body('password').isLength({ min: 5 })
    ];
  },

  validateLogin() {
    return [
      body('username').notEmpty(),
      body('password').notEmpty()
    ];
  },

  validateResults(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
};
