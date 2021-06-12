const express = require('express'); // dependencia para rutas, cookies , sesiones , etc
const morgan = require('morgan'); // para middlewares y autenticación
const app = express();
const cors = require('cors')

const { mongoose } = require('./db'); // Requerimos nuestra conexión a la bd

// Setting
app.set('port', process.env.PORT || 3000); // Acceder a una constante PORT con puertos

// Middlewares
app.use(morgan('dev'));
app.use(express.json()); // Para rutas, cookies , sesiones , etc
app.use(cors({ origin: 'http://localhost:4200' })); // Para el error de Cors Policy

// Routes
app.use('/api/quadrangulars', require('./routes/quadrangular.routes')) // api... es el nombre de la ruta
app.use('/api/tasks', require('./routes/task.routes')) // api... es el nombre de la ruta
app.use('/api/login', require('./routes/login.routes')) // api.bla bla.. es el nombre de la ruta
app.use('/api/pets', require('./routes/pet.routes')) // Aqui se encuentran las rutas que acceden a las operaciones crud y etc
app.use('/api/travels', require('./routes/travel.routes')) // Aqui se encuentran las rutas que acceden a las operaciones crud y etc

// Start the server
app.listen(app.get('port'), () => console.log(`Server on port: ${app.get('port')}`))