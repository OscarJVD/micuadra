const mongoose = require('mongoose');
const { Schema } = mongoose;

const TaskSchema = new Schema({
    idUser: { type: String, required: false },
    name: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: Number, required: true },
})

module.exports = mongoose.model('Pet', TaskSchema) // Se exporta como modelo