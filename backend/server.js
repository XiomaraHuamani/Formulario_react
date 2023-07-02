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

// Conéctate a la base de datos
connection.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos: ', err);
    } else {
        console.log('Conexión exitosa a la base de datos');
    }
});

// Define una ruta para obtener datos de la base de datos
app.get('/data', (req, res) => {
    // Realiza una consulta a la base de datos
    connection.query('SELECT * FROM datos_personales_formulario', (err, results) => {
        const {
            Numero_documento,
            nombre,
            Apellido_paterno,
            Apellido_materno,
            sexo,
            fecha,
            correo,
            Numero_celular,
            Direccion,
            departamento,
            provincia,
            distrito
        } = req.query;

        const sql = `INSERT INTO datos_personales_formulario (Numero_documento, nombre, Apellido_paterno, Apellido_materno, sexo, fecha, correo, Numero_celular, Direccion, departamento, provincia, distrito) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        connection.query(
            sql,
            [
                Numero_documento,
                nombre,
                Apellido_paterno,
                Apellido_materno,
                sexo,
                fecha,
                correo,
                Numero_celular,
                Direccion,
                departamento,
                provincia,
                distrito
            ],
            (err, result) => {
                if (err) {
                    console.error('Error al ejecutar la consulta: ', err);
                    res.status(500).json({ error: 'Error al insertar los datos en la base de datos' });
                } else {
                    res.json({ message: 'Datos insertados correctamente' });
                }
            }
        )
    });
});

// Inicia el servidor
app.listen(port, () => {
    console.log(`Servidor backend en ejecución en http://localhost:${port}`);
});
