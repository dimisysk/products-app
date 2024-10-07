const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the product schema (if needed separately)
let productSchema = new Schema({
    product: { type: String, required: true },
    cost: { type: Number, required: true },
    quantity: { type: Number, required: true },
    date: { type: Date, default: Date.now }
}, {
    collection: 'products',
    timestamps: true
});


// Correctly export the model
module.exports = mongoose.model('Product', productSchema);
