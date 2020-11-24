const mongoose = require('mongoose');
const { Schema } = mongoose;

const TravelSchema = new Schema({
    placeName: { type: String, required: true },
    places: { type: String, required: true },
    toDo: { type: String, required: true },
    food: { type: String, required: true },
    hotels: { type: String, required: true },
    price: { type: Number, required: true },
    status: { type: Number, required: true },
    type: { type: Number, required: true }
})

module.exports = mongoose.model('Travels', TravelSchema) // Se exporta como modelo

