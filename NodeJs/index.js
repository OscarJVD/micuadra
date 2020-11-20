const express = require('express'); // dependencia para rutas, cookies , sesiones , etc
const morgan = require('morgan'); // para middlewares y autenticación
const app = express();
const cors = require('cors')

const { mongoose } = require('./db'); // Requerimos nuestra conexión a labd

// Setting
app.set('port', process.env.PORT || 3000); // Asignamos un puerto para ejecutar la app

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({ origin: 'http://localhost:4200' }));

// Routes
app.use('/api/tasks', require('./routes/task.routes')) // api... es el nombre de la ruta

// Start the server
app.listen(app.get('port'), () => {
    console.log(`Server on port: ${app.get('port')}`);
})