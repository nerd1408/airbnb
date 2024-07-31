const Listing = require('../models/listing.model');

// exports.getAllListings = async () => {
//   return await Listing.find();
// };


const mockListings = [
  {
    id: 1,
    title: "Cozy Apartment in the City Center",
    description: "A cozy apartment located in the heart of the city.",
    price: 1200,
    location: "City Center",
    images: ["image1.jpg", "image2.jpg"],
    amenities: ["WiFi", "Air Conditioning", "Heating"]
  },
  {
    id: 2,
    title: "Spacious House in the Suburbs",
    description: "A spacious house with a large backyard in a quiet suburb.",
    price: 2500,
    location: "Suburbs",
    images: ["image3.jpg", "image4.jpg"],
    amenities: ["Garage", "Garden", "Pet Friendly"]
  },
  {
    id: 3,
    title: "Modern Loft with Great Views",
    description: "A modern loft with stunning views of the city skyline.",
    price: 1800,
    location: "Downtown",
    images: ["image5.jpg", "image6.jpg"],
    amenities: ["Rooftop Access", "Gym", "Pool"]
  }
];

// Mock listing service to return the mock data
exports.getAllListings = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockListings);
    }, 1000); // Simulate async operation
  });
};