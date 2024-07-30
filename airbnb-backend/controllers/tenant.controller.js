const listingTenantService = require('../services/tenant.service');

exports.getAllListings = async (req, res, next) => {
  try {
    const listings = await listingTenantService.getAllListings();
    res.json(listings);
  } catch (err) {
    next(err);
  }
};

exports.getAllByCategory = async (req, res, next) => {
    try {
      const listings = await listingTenantService.getAllListings();
      res.json(listings);
    } catch (err) {
      next(err);
    }
};

exports.postByCategory = async (req, res, next) => {
  try {
    const listings = await listingTenantService.postByCategory();
    res.json(listings);
  } catch (err) {
    next(err);
  }
};
  
exports.getOne = async (req, res, next) => {
    try {
      const listings = await listingTenantService.getAllListings();
      res.json(listings);
    } catch (err) {
      next(err);
    }
};
  

