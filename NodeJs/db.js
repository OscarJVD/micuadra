const mongoose = require('mongoose'); // Conexión con mongoose mas rápida
const URI = "mongodb://localhost:27017/solutasks"; // Url de la bd

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}) // Conexión por promesa
    .then(db => console.info(`MongoDB Connected :D`))
    .catch(e => console.error(`Error Conexión: ${e}`))

module.exports = mongoose;