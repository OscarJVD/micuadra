const { Shema, model } = require('mongoose');

const loginSchema = new Schema({
    email: String,
    name: String,
    password: String,
    authMethod: String,
    idAuth: String
}, {
    timestamps: true
});

module.exports = model('Login', loginSchema)