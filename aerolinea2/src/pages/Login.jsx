// Login.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';

export default function LoginForm({ setIsAuthenticated }) {
    const confToast = {
        position: 'bottom-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
    };

    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, watch } = useForm();

    const onSubmit = handleSubmit(async (datos) => {
        const usuario = {
            mail: datos.mail,
            pass: datos.pass,
        };

        const parametros = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': sessionStorage.getItem('token'),
            },
            body: JSON.stringify(usuario),
        };

        const url = "http://localhost:8081/security/login";

        try {
            const res = await fetch(url, parametros);
            const body = await res.json();

            if (res.ok) {
                // Guardar token y nombre del usuario
                sessionStorage.setItem('token', body.token);

                // Cambiar estado de autenticación en la aplicación principal
                setIsAuthenticated(true);

                toast.success(`Bienvenido ${body.datos.nombre}`, confToast);

                // Redirigir al Home o una ruta específica
                navigate("/");
            } else {
                toast.error(body.message, confToast);
            }
        } catch (error) {
            toast.error(error.message, confToast);
        }
    });

    return (
        <section className='section_login'>
            <h3 className='titulo_login'>Ingresa a tu cuenta</h3>
            <form
                onSubmit={onSubmit}
                className="container_login">
                <div>
                    <label className='label_login'>Usuario o email</label>
                    <input
                        className='input_login'
                        type="email"
                        {...register('mail', {
                            required: true,
                            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        })}
                    />
                    {errors.mail?.type === 'required' && (
                        <div className="alert alert-danger mt-2" role="alert">
                            Mail es requerido
                        </div>
                    )}
                </div>
                <div>
                    <label className='label_login'>Contraseña</label>
                    <input
                        className='input_login'
                        type="password"
                        {...register('pass', {
                            required: {
                                value: true,
                                message: 'Contraseña es requerida',
                            },
                            minLength: {
                                value: 8,
                                message: 'La contraseña debe tener al menos 8 caracteres',
                            },
                            maxLength: {
                                value: 16,
                                message: 'La contraseña debe tener máximo 16 caracteres',
                            },
                        })}
                    />
                    {errors.pass && (
                        <div className="alert alert-danger mt-2" role="alert">
                            {errors.pass.message}
                        </div>
                    )}
                </div>
                <div className="div_btn">
                    <input className='btn_login' type="submit" value="Iniciar Sesión" />
                </div>
            </form>
        </section>
    );
}
