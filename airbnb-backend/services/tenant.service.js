const Listing = require('../models/listing.model'); // Adjust path as necessary

exports.getAllListings = async () => {
  try {
    const listings = await Listing.find(); // Use find() to retrieve all listings
    return listings;
  } catch (err) {
    throw new Error(`Error retrieving listings: ${err.message}`);
  }
};

exports.getListingsByCategory = async (category) => {
  try {
    const listings = await Listing.find({ category }); // Find by category
    return listings;
  } catch (err) {
    throw new Error(`Error retrieving listings by category: ${err.message}`);
  }
};
