const Listing = require('../models/tenant.model');

exports.getAllListings = async () => {
  return await Listing.get();
};

exports.postByCategory = async () => {
return await postCategory.post();
};
  
exports.getAllByCategory = async () => {
return await getAllByCategory.get();
};
  
exports.getOne = async () => {
return await getOne.getOne();
};

