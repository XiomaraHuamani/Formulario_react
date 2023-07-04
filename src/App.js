import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const App = () => {
	
	const [formularioEnviado, cambiarFormularioEnviado] = useState(false);

	const handleSubmit = async (values, { resetForm }) => {
		try {
			await axios.post('http://localhost:3001/api/datos_personales', values);
			resetForm();
			console.log('Formulario enviado');
			cambiarFormularioEnviado(true);
			setTimeout(() => cambiarFormularioEnviado(false), 5000);
		} catch (error) {
			console.error('Error al enviar el formulario:', error);
		}
	};
	return (
		<>
			<div className='contenedor'>
				<Formik
					initialValues={{
						Numero_documento: '',
						nombre: '',
						Apellido_paterno: '',
						Apellido_materno: '',
						sexo: '',
						fecha: '',
						correo: '',
						Numero_celular: '',
						Direccion: '',
						departamento: '',
						provincia: '',
						distrito: ''
					}}
					validate={(values) => {
						let errores = {};

						if (!values.Numero_documento) {
							errores.Numero_documento = 'Por favor ingresa tu número de documento';
						}

						if (!values.nombre) {
							errores.nombre = 'Por favor ingresa un nombre';
						}

						if (!values.Apellido_paterno) {
							errores.Apellido_paterno = 'Por favor ingresa su apellido paterno';
						}

						if (!values.Apellido_materno) {
							errores.Apellido_materno = 'Por favor ingresa su apellido materno';
						}

						if (!values.correo) {
							errores.correo = 'Por favor ingresa un correo electrónico';
						}

						if (!values.Numero_celular) {
							errores.Numero_celular = 'Por favor ingresa tu número de celular';
						}

						if (!values.Direccion) {
							errores.Direccion = 'Por favor ingresa una dirección';
						}

						if (!values.departamento) {
							errores.departamento = 'Por favor selecciona un departamento';
						}

						if (!values.provincia) {
							errores.provincia = 'Por favor selecciona una provincia';
						}

						if (!values.distrito) {
							errores.distrito = 'Por favor selecciona un distrito';
						}

						return errores;
					}}
					onSubmit={handleSubmit}
				>
					{({ errors }) => (
						<Form className='formulario'>
							<h1>Ingrese sus datos</h1>

							<div>
								<label htmlFor='Numero_documento'>Número documento</label>
								<Field type='text' id='Numero_documento' name='Numero_documento' />
								<ErrorMessage name='Numero_documento' component='div' className='error' />
							</div>

							<div>
								<label htmlFor='nombre'>Nombre</label>
								<Field type='text' id='nombre' name='nombre' />
								<ErrorMessage name='nombre' component='div' className='error' />
							</div>

							<div>
								<label htmlFor='Apellido_paterno'>Apellido paterno</label>
								<Field type='text' id='Apellido_paterno' name='Apellido_paterno' />
								<ErrorMessage name='Apellido_paterno' component='div' className='error' />
							</div>

							<div>
								<label htmlFor='Apellido_materno'>Apellido materno</label>
								<Field type='text' id='Apellido_materno' name='Apellido_materno' />
								<ErrorMessage name='Apellido_materno' component='div' className='error' />
							</div>

							<div>
								<label htmlFor='sexo'>Género</label>
								<Field as='select' id='sexo' name='sexo'>
									<option value='hombre'>Hombre</option>
									<option value='mujer'>Mujer</option>
								</Field>
							</div>

							<div>
								<label htmlFor='fecha'>Fecha</label>
								<Field type='date' id='fecha' name='fecha' />
								<ErrorMessage name='fecha' component='div' className='error' />
							</div>

							<div>
								<label htmlFor='correo'>Correo</label>
								<Field type='text' id='correo' name='correo' />
								<ErrorMessage name='correo' component='div' className='error' />
							</div>

							<div>
								<label htmlFor='Numero_celular'>Número celular</label>
								<Field type='text' id='Numero_celular' name='Numero_celular' />
								<ErrorMessage name='Numero_celular' component='div' className='error' />
							</div>

							<div>
								<label htmlFor='Direccion'>Dirección</label>
								<Field type='text' id='Direccion' name='Direccion' />
								<ErrorMessage name='Direccion' component='div' className='error' />
							</div>

							<div>
								<label htmlFor='departamento'>Departamento</label>
								<Field as='select' id='departamento' name='departamento'>
									<option value='arequipa'>Arequipa</option>
									{/* Agrega las opciones para los demás departamentos */}
								</Field>
							</div>

							<div>
								<label htmlFor='provincia'>Provincia</label>
								<Field as='select' id='provincia' name='provincia'>
									<option value='arequipa'>Arequipa</option>
									{/* Agrega las opciones para las provincias del departamento seleccionado */}
								</Field>
							</div>

							<div>
								<label htmlFor='distrito'>Distrito</label>
								<Field as='select' id='distrito' name='distrito'>
									<option value='arequipa'>Arequipa</option>
									{/* Agrega las opciones para los distritos de la provincia seleccionada */}
								</Field>
							</div>

							<button type='submit'>Crear Cuenta</button>
							{formularioEnviado && <p className='exito'>Formulario enviado con éxito!</p>}
						</Form>
					)}
				</Formik>
			</div>
		
		</>
	);
}
export default App;