const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        enum: ['veg', 'non-veg', 'vegan'],
        required: true
    },
    type: {
        type: String,
        enum: ['starter', 'main-course', 'dessert'],
        required: true
    }
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

module.exports = MenuItem;