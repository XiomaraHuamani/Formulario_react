const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3001;

// Configura la conexión a la base de datos MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'paseo',
});

app.get('/departamentos', (req, res) => {
    connection.query('SELECT * FROM departamentos  ' , (error, results) => {
        if (error) {
            console.error('Error al obtener los departamentos: ', error);
            res.status(500).json({ error: 'Error al obtener los departamentos' });
        } else {
            res.json(results);
        }
    });
});

// Ruta para obtener las provincias
app.get('/provincias', (req, res) => {
    connection.query('SELECT * FROM provincias', (error, results) => {
        if (error) {
            console.error('Error al obtener las provincias: ', error);
            res.status(500).json({ error: 'Error al obtener las provincias' });
        } else {
            res.json(results);
        }
    });
});

// Ruta para obtener los distritos
app.get('/distritos', (req, res) => {
    connection.query('SELECT * FROM distritos ', (error, results) => {
        if (error) {
            console.error('Error al obtener los distritos: ', error);
            res.status(500).json({ error: 'Error al obtener los distritos' });
        } else {
            res.json(results);
        }
    });
});

// Iniciar el servidor
app.listen(3001, () => {
    console.log('Servidor iniciado en el puerto 3001');
});
