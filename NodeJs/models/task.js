const mongoose = require('mongoose');
const { Schema } = mongoose;

const TaskSchema = new Schema({
    title:          { type: String, required: true },
    byWhen:         { type: Date, required: true },
    assignmentDate: { type: Date, required: true },
    subject:        { type: String, required: true }, // Materia
    topic:          { type: String, required: true },
    description:    { type: String, required: true },
    status:         { type: Number, required: true },
})

module.exports = mongoose.model('Tasks', TaskSchema)

