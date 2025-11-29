import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import supabase from '../supabase/supabase';

import '../css/Login.css';

const Login = () => {
    const [identifier, setIdentifier] = useState(''); // usuario o email
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        setMessage('');
        setMessageType('');

        const input = identifier.trim();
        const pass = password.trim();

        if (!input || !pass) {
            setMessage("Por favor completa todos los campos.");
            setMessageType("error");
            return;
        }

        let emailToUse = input;

        try {
            // Si el usuario NO escribe un email, lo buscamos como username
            if (!input.includes('@')) {
                const { data, error } = await supabase
                    .from('profiles')
                    .select('email')
                    .eq('username', input)
                    .single();

                if (error || !data) {
                    setMessage("Usuario no encontrado.");
                    setMessageType("error");
                    return;
                }

                emailToUse = data.email;
            }

            // Autenticación
            const { error: authError } = await supabase.auth.signInWithPassword({
                email: emailToUse,
                password: pass
            });

            if (authError) {
                let msg = "Credenciales incorrectas.";

                if (authError.message.includes("Email not confirmed")) {
                    msg = "Tu email no está confirmado. Revisa tu bandeja de entrada.";
                }

                setMessage(msg);
                setMessageType("error");
                return;
            }

            // Logueo exitoso
            setMessage("✔ Bienvenido, redirigiendo...");
            setMessageType("success");

            setTimeout(() => navigate("/"), 1200);

        } catch (err) {
            console.error(err);
            setMessage("Ocurrió un error inesperado.");
            setMessageType("error");
        }
    };

    return (
        <div className="login-container">
            
            <button onClick={() => navigate(-1)} className="back-button">
                ← Volver
            </button>

            {message && (
                <div className={`message-box ${messageType === "success" ? "message-success" : "message-error"}`}>
                    {message}
                </div>
            )}

            <div className="login-card">
                <h2 className="login-title">Iniciar Sesión</h2>

                <form onSubmit={handleLogin} className="login-form">

                    <div className="form-group">
                        <label htmlFor="identifier">Usuario o Email</label>
                        <input
                            id="identifier"
                            type="text"
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                            placeholder="Ingresa tu usuario o correo"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Ingresa tu contraseña"
                            required
                        />
                    </div>

                    <button type="submit" className="login-button">
                        Iniciar Sesión
                    </button>
                </form>

                <div className="separator"></div>

                <p className="register-text">¿Aún no tienes cuenta?</p>

                <Link to="/registro" className="register-button">
                    Crear Cuenta
                </Link>
            </div>
        </div>
    );
};

export default Login;
