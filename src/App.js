import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';

//import FormInput from "./components/FormInput";

const App = () => {

	const handleSubmit = (values) => {
		axios.post('http://localhost:3001/data', values)
			.then((response) => {
				console.log('Formulario enviado');
				cambiarFormularioEnviado(true);
				setTimeout(() => cambiarFormularioEnviado(false), 5000);
			})
			.catch((error) => {
				console.error('Error al enviar los datos del formulario: ', error);
			});
	};

	const [data, setData] = useState([]);

	useEffect(() => {
		// Realiza la solicitud HTTP al servidor backend
		axios.get('http://localhost:3001/data')
			.then((response) => {
				setData(response.data);
			})
			.catch((error) => {
				console.error('Error al obtener los datos: ', error);
			});
	}, []);

	const [formularioEnviado, cambiarFormularioEnviado] = useState(false);
	const wrapper = document.querySelector(".wrapper");
	const selectBtn = wrapper?.querySelector(".select-btn");
	const options = wrapper?.querySelector(".options");
	let departamentos = ["arequipa", "lima", "piura"]

	function addDepartamentos() {
		departamentos.forEach(departamentos => {
			let li = '<li>${departamentos}</li>';
			options.insertAdjacentHTML("beforeend", li);
		})
	}

	if (wrapper && selectBtn) {
		selectBtn.addEventListener("click", () => {
			wrapper.classList.toggle("active");
		});
	}
	return (
		<>
			<div className='contenedor'>

				<Formik
					initialValues={{
						nombre: '',
						correo: '',
						Numero_documento: '',
						Apellido_paterno: '',
						Apellido_materno: '',
						fecha: '',
						Numero_celular: '',
						Direccion: ''

					}}
					validate={(valores) => {
						// Lógica para manejar el envío del formulario

						let errores = {};

						// Numero de documento
						if (!valores.Numero_documento) {
							errores.Numero_documento = 'Por favor ingresa tu número de documento';
						} else if (!/^[0-9]+$/.test(valores.Numero_documento)) {
							errores.Numero_documento = 'El número de documento solo puede contener números';
						}

						// Numero de celular
						if (!valores.Numero_celular) {
							errores.Numero_celular = 'Por favor ingresa tu número de celular';
						} else if (!/^[0-9]+$/.test(valores.Numero_celular)) {
							errores.Numero_celular = 'El campo de número de celular solo puede contener números';
						}

						// Validacion nombre
						if (!valores.nombre) {
							errores.nombre = 'Por favor ingresa un nombre'
						} else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.nombre)) {
							errores.nombre = 'El nombre solo puede contener letras y espacios'
						}

						// Validacion apellido paterno
						if (!valores.Apellido_paterno) {
							errores.Apellido_paterno = 'Por favor ingresa su apellido paterno'
						} else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.Apellido_paterno)) {
							errores.Apellido_paterno = 'El campo solo puede contener letras y espacios'
						}

						// Validacion Apellido_materno
						if (!valores.Apellido_materno) {
							errores.Apellido_materno = 'Por favor ingresa su apellido materno'
						} else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.Apellido_materno)) {
							errores.Apellido_materno = 'El campo solo puede contener letras y espacios'
						}

						// Validacion correo
						if (!valores.correo) {
							errores.correo = 'Por favor ingresa un correo electronico'
						} else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(valores.correo)) {
							errores.correo = 'El correo solo puede contener letras, numeros, puntos, guiones y guion bajo.'
						}

						return errores;
					}}
					onSubmit={(valores, { resetForm }) => {
						resetForm();
						console.log('Formulario enviado');
						cambiarFormularioEnviado(true);
						setTimeout(() => cambiarFormularioEnviado(false), 5000);
					  }}
					
				>
					{({ errors }) => (
						<Form className="formulario">
							<h1>Ingrese sus datos</h1>
							<div>
								<label htmlFor="Numero_documento">Numero documento</label>
								<Field
									type="number"
									id="Numero documento"
									name="Numero_documento"
									placeholder="Numero documento"
								/>
								<ErrorMessage name="Numero_documento" component={() => (<div className="error">{errors.Numero_documento}</div>)} />
							</div>

							<div>
								<label htmlFor="nombre">Nombre</label>
								<Field
									type="text"
									id="nombre"
									name="nombre"
									placeholder="Nombre"
								/>
								<ErrorMessage name="nombre" component={() => (<div className="error">{errors.nombre}</div>)} />
							</div>
							<div>
								<label htmlFor="Apellido paterno">Apellido paterno</label>
								<Field
									type="text"
									id="Apellido paterno"
									name="Apellido_paterno"
									placeholder="Apellido paterno"
								/>
								<ErrorMessage name="Apellido_paterno" component={() => (<div className="error">{errors.Apellido_paterno}</div>)} />
							</div>
							<div>
								<label htmlFor="Apellido paterno">Apellido materno</label>
								<Field
									type="text"
									id="Apellido materno"
									name="Apellido_materno"
									placeholder="Apellido materno"
								/>
								<ErrorMessage name="Apellido_materno" component={() => (<div className="error">{errors.Apellido_materno}</div>)} />
							</div>
							<div>
								<label htmlFor="genero">Genero</label>
								<label>
									<Field type="radio" name="sexo" value="hombre" /> Hombre
								</label>
								<label>
									<Field type="radio" name="sexo" value="mujer" /> Mujer
								</label>
							</div>
							<div>
								<label htmlFor='Fecha'>Fecha</label>
								<Field
									type="date"
									id="fecha"
									name="fecha"
									placeholder="dd/mm/yyyy"
								/>
								<ErrorMessage name="fecha" component={() => (<div className="error">{errors.fecha}</div>)} />
							</div>
							<div>
								<label htmlFor="correo">Correo</label>
								<Field
									type="text"
									id="correo"
									name="correo"
									placeholder="correo@correo.com"
								/>
								<ErrorMessage name="correo" component={() => (<div className="error">{errors.correo}</div>)} />
							</div>
							<div>
								<label htmlFor="Numero de celular">Numero celular</label>
								<Field
									type="number"
									id="Numero celular"
									name="Numero_celular"
									placeholder="Numero celular"
								/>
								<ErrorMessage name="Numero_celular" component={() => (<div className="error">{errors.Numero_celular}</div>)}></ErrorMessage>
							</div>
							<div>
								<label htmlFor="nombre">Direccion</label>
								<Field
									type="text"
									id="Direccion"
									name="Direccion"
									placeholder="Direccion"
								/>
								<ErrorMessage name="Direccion" component={() => (<div className="error">{errors.Direccion}</div>)} />
							</div>

							<div>
								<label htmlFor="nombre">Departamento</label>
								<Field name="departamento" as="select">
									<option value="arequipa">Arequipa</option>
								</Field>
							</div>
							<div>
								<label htmlFor="nombre">Provincia</label>
								<Field name="provincia" as="select">
									<option value="arequipa">Arequipa</option>

								</Field>
							</div>
							<div>
								<label htmlFor="nombre">Distrito</label>
								<Field name="distrito" as="select">
									<option value="arequipa">Arequipa</option>
								</Field>
							</div>

							<button type="submit" onClick={handleSubmit}>Crear Cuenta</button>





							{formularioEnviado && <p className="exito">Formulario enviado con exito!</p>}
						</Form>
					)}

				</Formik>
			</div>
		</>
	);
}
export default App;
