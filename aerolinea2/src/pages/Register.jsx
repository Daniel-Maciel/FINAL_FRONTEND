//Register.jsx

import React, { useState } from 'react';
import '../style/Register.css'; 

export default function Register() {
    const [formData, setFormData] = useState({
        dni: '',
        nombre: '',
        apellido: '',
        direccion: '',
        telefono: '',
        email: '',
        pass: '',
        id_rol: 1,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8081/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert("Usuario registrado exitosamente");
                setFormData({
                    dni: '',
                    nombre: '',
                    apellido: '',
                    direccion: '',
                    telefono: '',
                    email: '',
                    pass: '',
                    id_rol: 1,
                });
            } else {
                const error = await response.json();
                alert(`Error: ${error.message}`);
            }
        } catch (error) {
            alert("Error al registrar el usuario.");
        }
    };

    return (
        <div className="register-background">
            <div className="register-container">
                {/* Imagen izquierda */}
                <div className="register-left">
                    <h1>¡Bienvenido!</h1>
                    {/* <p>Regístrate para acceder a nuestros servicios.</p> */}
                </div>

                {/* Formulario */}
                <div className="register-right">
                    <h2 className="titulo_register">Registro de Usuario</h2>
                    <form className="register-form" onSubmit={handleSubmit}>
                        <div>
                            <label className="label_register">DNI</label>
                            <input
                                className="input_register"
                                type="text"
                                name="dni"
                                value={formData.dni}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label className="label_register">Nombre</label>
                            <input
                                className="input_register"
                                type="text"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label className="label_register">Apellido</label>
                            <input
                                className="input_register"
                                type="text"
                                name="apellido"
                                value={formData.apellido}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label className="label_register">Dirección</label>
                            <input
                                className="input_register"
                                type="text"
                                name="direccion"
                                value={formData.direccion}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label className="label_register">Teléfono</label>
                            <input
                                className="input_register"
                                type="text"
                                name="telefono"
                                value={formData.telefono}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="label_register">Correo Electrónico</label>
                            <input
                                className="input_register"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label className="label_register">Contraseña</label>
                            <input
                                className="input_register"
                                type="password"
                                name="pass"
                                value={formData.pass}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label className="label_register">Rol</label>
                            <select
                                className="select_register"
                                name="id_rol"
                                value={formData.id_rol}
                                onChange={handleChange}
                            >
                                <option value={1}>Cliente</option>
                                {/* <option value={2}>Administrativo</option> */}
                            </select>
                        </div>
                        <div className="full-width">
                            <button className="btn_register" type="submit">Registrar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

