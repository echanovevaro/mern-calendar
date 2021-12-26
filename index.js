const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

// Create a new express application instance

const app = express();

//Base de datos
dbConnection();

// CORS

app.use(cors());

// Directorio Publico

app.use(express.static('public'));

//Lectura y parseo del body

app.use(express.json());

//Rutas

app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

//listen for requests Escuchar peticiones
app.listen(process.env.PORT, () => {
	console.log(`Server is up on port ${process.env.PORT}`);
});
