const Listing = require('../models/listing.model');

exports.getAllListings = async () => {
  return await Listing.find();
};

