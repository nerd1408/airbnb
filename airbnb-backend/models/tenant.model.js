const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
    description: {
        type: { 
            title: { value: { type: String, required: true } },
            description: { value: { type: String, required: true } }
        },
        required: true
    },
    pictures: {
        type: { 
            picture: [{
                file: { type: String, required: true },
                fileContentType: { type: String, required: true },
                isCover: { type: Boolean, required: true }
            }]
        },
        required: true
    },
    infos: {
        type: {
            guests: { value:{ type: Number, required: true } },
            bedrooms: { value:{ type: Number, required: true } },
            beds: { value:{ type: Number, required: true } },
            baths: { value:{ type: Number, required: true } }
        },
        required: true
    },
    price: { value:{ type: Number, required: true } },
    category: { type: String, required: true },
    location: { type: String, required: true },
    landlord: {
        type: {
            firstname: { type: String, required: true },
            imageUrl: { type: String, required: true },
        },
        required: true
    }
});

const listingCardSchema = new mongoose.Schema({
    cover: {
        type: { 
            file: { type: String, required: true },
            fileContentType: { type: String, required: true },
            isCover: { type: Boolean, required: true }
        },
        required: true
    },
    price: { value: { type: Number, required: true } },
    bookingCategory: { type: String, required: true },
    location: { type: String, required: true },
    publicId: { type: String, required: true },
    loading: { type: String, required: true }
});

module.exports = mongoose.model('Listing', listingSchema);
module.exports = mongoose.model('getAllByCategory', listingCardSchema);
module.exports = mongoose.model('postCategory', listingCardSchema);
module.exports = mongoose.model('getOne', listingSchema);
