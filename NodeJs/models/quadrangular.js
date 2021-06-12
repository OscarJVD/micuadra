const mongoose = require('mongoose');
const { Schema } = mongoose;

const QuadrangularSchema = new Schema({
    firstTeam: { type: String, required: true },
    secondTeam: { type: String, required: true },
    thirdTeam: { type: String, required: true },
    fourthTeam: { type: String, required: true },
    firstCoupleScore: { type: String, required: true },
    secondCoupleScore: { type: String, required: true },
    firstTeamGoals: { type: Number, required: true },
    secondTeamGoals: { type: Number, required: true },
    thirdTeamGoals: { type: Number, required: true },
    fourthTeamGoals: { type: Number, required: true },
    status: { type: Number, required: true },
}, {
    timestamps: true
})

module.exports = mongoose.model('Quadrangulars', QuadrangularSchema) // Se exporta como modelo

