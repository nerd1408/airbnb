const express = require('express');
const router = express.Router();
const tenantController = require('../controllers/tenant.controller');

router.get('/', tenantController.getAllListings);
router.get('/get-all-by-category', tenantController.getAllByCategory);
router.post('/get-all-by-category', tenantController.postByCategory);
router.get('/get-one', tenantController.getOne);

module.exports = router;
