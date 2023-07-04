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

app.get('/api/datos_personales', (req, res) => {
    connection.query('SELECT * FROM datos_personales_formulario', (error, results) => {
        if (error) {
            console.error('Error al realizar la consulta:', error);
            res.status(500).json({ error: 'Error al realizar la consulta' });
            return;
        }

        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Servidor API iniciado en el puerto ${port}`);
});