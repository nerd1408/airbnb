const express = require('express');
const router = express.Router();
const tenantController = require('../controllers/tenant.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', tenantController.getAllListings);

module.exports = router;
