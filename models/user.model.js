const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

// Define address and phone schemas
let addressSchema = new Schema({
    area: { type: String },
    road: { type: String }
}, { _id: false });

let phoneSchema = new Schema({
    type: { type: String },
    number: { type: String }
}, { _id: false });

// Define product schema
let productSchema = new Schema({
    product: { type: String, required: true },
    cost: { type: Number, required: true },
    quantity: { type: Number, required: true },
    date: { type: Date, default: Date.now }
}, {
    timestamps: true  // Enables createdAt and updatedAt timestamps
});


// Define user schema
let userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is a required field'],
        maxLength: 20,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Password is a required field'],
        maxLength: 20,
        minLength: 6,
    },
    name: { type: String },
    surname: { type: String },
    email: {
        type: String,
        required: [true, 'Email is a required field'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email address is not valid.']
    },
    address: addressSchema,
    phone: [phoneSchema],
    products: [productSchema]  // Embed productSchema here
}, {
    collection: 'users',
    timestamps: true
});

// Apply unique validator
userSchema.plugin(uniqueValidator);

// Export the User model
module.exports = mongoose.model('User', userSchema);
