const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
        minLength: [3, "Pet Name Must be at least 3 characters"],
    },
    type: {
        type: String, 
        required: true,
        minLength: [3, "Pet Name Must be at least 3 characters"],
    },
    description: {
        type: String, 
        required: true,
        minLength: [3, "Pet Name Must be at least 3 characters"],
    },
    skill_1: {
        type: String,
        required: false,
    },
    skill_2: {
        type: String,
        required: false,
    },
    skill_3: {
        type: String,
        required: false,
    },
    likes: {
        type: Number,
        required: true,
    }
}, { timestamps: true });

const Pet = mongoose.model("Pet", PetSchema);

module.exports = Pet;