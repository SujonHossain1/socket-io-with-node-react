const { Schema, model } = require('mongoose');

const launchSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['available', 'unavailable', 'processing'],
        default: 'available',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
const Launch = model('Lunch', launchSchema);
module.exports = Launch
