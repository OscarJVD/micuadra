const mongoose = require('mongoose'); // Conexión con mongoose mas rápida
const URI = "mongodb+srv://dovj:hotdompro@cluster0.a3ekd.mongodb.net/micuadra?retryWrites=true&w=majority"; // Url de la bd

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}) // Conexión por promesa
    .then(db => console.info(`MongoDB Connected :D`))
    .catch(e => console.error(`Error Conexión: ${e}`))

module.exports = mongoose;