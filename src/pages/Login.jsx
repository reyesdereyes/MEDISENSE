import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import supabase from '../supabase/supabase';

import '../css/Login.css';

const Login = () => {
    // ESTADOS
    const [identifier, setIdentifier] = useState(''); // Usuario o Email
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    const navigate = useNavigate();
    
    const GENERIC_ERROR_MSG = "Credenciales incorrectas. Verifica tu usuario/correo y contraseña.";
    
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
            // Si el input NO contiene '@', asumimos que es un nombre de usuario.
            if (!input.includes('@')) {
                const { data, error } = await supabase
                    .from('profiles')
                    .select('email')
                    .eq('username', input)
                    .single();

                if (error || !data || !data.email) {
                    console.error("Error buscando usuario en profiles:", error);
                    setMessage(GENERIC_ERROR_MSG);
                    setMessageType("error");
                    return;
                }

                emailToUse = data.email;
            }

            // AUTENTICACIÓN CON SUPABASE AUTH
            const { error: authError } = await supabase.auth.signInWithPassword({
                email: emailToUse,
                password: pass
            });

            if (authError) {
                console.error("Error en login:", authError.message);
                setMessage(GENERIC_ERROR_MSG);
                setMessageType("error");
                return;
            }

            // LOGIN EXITOSO
            setMessage("✔ Bienvenido, redirigiendo...");
            setMessageType("success");

            setTimeout(() => navigate("/"), 1200);

        } catch (err) {
            console.error("Error inesperado en login:", err);
            setMessage("Ocurrió un error inesperado. Inténtalo de nuevo.");
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

                    <Link  to='/MEDISENSE'type="submit" className="login-button">
                        Iniciar Sesión
                    </Link>
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
