const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth.routes'));
router.use('/listings', require('./listing.routes'));
router.use('/users', require('./user.routes'));
router.use('/users', require('./user.routes'));
router.use('/tenant-listing', require('./tenantListingRoutes.routes'));

module.exports = router;
