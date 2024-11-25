//Login.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';
import '../style/LoginForm.css'; 

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
    const { register, handleSubmit, formState: { errors } } = useForm();

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
            console.log('Respuesta del backend:', body); 

            if (res.ok) {
                sessionStorage.setItem('token', body.token);
                sessionStorage.setItem('id_rol', body.datos.id_rol); // Guardar id_rol
                setIsAuthenticated(true);
                toast.success(`Bienvenido ${body.datos.nombre}`, confToast);
                navigate("/");
            } else {
                toast.error(body.message, confToast);
            }
        } catch (error) {
            toast.error(error.message, confToast);
        }
    });

    return (
        <div className="login-background"> {/* Contenedor exclusivo para el fondo */}
            <div className="login-container">
                <div className="login-left">
                    <h1>Bienvenido</h1>
                </div>
                <div className="login-right">
                    <h3 className="titulo_login">Iniciar Sesión</h3>
                    <form onSubmit={onSubmit} className="login-form">
                        <div>
                            <label className="label_login">Usuario o email</label>
                            <input
                                className="input_login"
                                type="email"
                                {...register('mail', {
                                    required: true,
                                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                })}
                            />
                            {errors.mail?.type === 'required' && (
                                <div className="alert_error">Email es requerido</div>
                            )}
                        </div>
                        <div>
                            <label className="label_login">Contraseña</label>
                            <input
                                className="input_login"
                                type="password"
                                {...register('pass', {
                                    required: 'Contraseña es requerida',
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
                            {errors.pass && <div className="alert_error">{errors.pass.message}</div>}
                        </div>
                        <div className="div_btn">
                            <button className="btn_login" type="submit">Iniciar Sesión</button>
                            <button
                                type="button"
                                className="btn_register"
                                onClick={() => navigate('/register')}
                            >
                                Registrarse
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
