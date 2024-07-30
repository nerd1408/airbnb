const logger = require('../utils/logger');

module.exports = function errorHandler(err, req, res, next) {
  logger.error('Error occurred:', err);
  res.status(500).json({ error: 'Internal Server Error' });
};
