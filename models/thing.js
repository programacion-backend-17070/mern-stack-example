const mongoose = require('mongoose');

const ThingSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    created: {
        type: Date,
        default: Date.now,
        required: true
    }
});

const Thing = mongoose.model('Thing', ThingSchema);

module.exports = Thing;