const mongoose = require('mongoose'); // Conexión con mongoose mas rápida
const URI = "mongodb://localhost:27017/solutasks";

mongoose.connect(URI)
    .then(db => console.info(`MongoDB Connected :D`))
    .catch(e => console.error(`Error Conexión: ${e}`))

module.exports = mongoose;