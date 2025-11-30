import React, { useState, useEffect } from 'react';

// SOLICITUD DEL USUARIO: Importar el cliente de Supabase desde una ruta relativa.
// ADVERTENCIA: Esta línea causará un error de compilación en este entorno de archivo único.
import supabase from "../supabase/supabase";

const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';

const Login = () => {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [isAuthReady, setIsAuthReady] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    
    const handleGoBack = () => {
        window.history.back();
    };

    const handleRegisterClick = (e) => {
        e.preventDefault();
        window.location.href = "/registro";
    };

    const GENERIC_ERROR_MSG = "Credenciales incorrectas o el usuario no existe. Verifica tu email y contraseña.";
    
    useEffect(() => {
        const checkSession = async () => {
            // La comprobación ahora asume que 'supabase' fue importado correctamente.
            if (!supabase || typeof supabase.auth === 'undefined') {
                setMessage("Error: El cliente de Supabase no se inicializó. Verifica la ruta de importación o si la librería está cargada.");
                setMessageType("error");
                setIsLoading(false);
                return;
            }

            setIsLoading(true);
            try {
                const { data: { session }, error } = await supabase.auth.getSession();
                
                if (error) throw error;

                if (session) {
                    setMessage("✔ Sesión activa detectada. Redirigiendo a /MEDISENSE...");
                    setMessageType("success");
                    setTimeout(() => window.location.href = "/MEDISENSE", 1200);
                } else {
                    setIsAuthReady(true);
                }
            } catch (e) {
                console.error("Error al verificar la sesión de Supabase:", e);
                setMessage("Error al conectar con el servicio de autenticación. Intenta nuevamente.");
                setMessageType("error");
            } finally {
                setIsLoading(false);
            }
        };

        setTimeout(checkSession, 100); 
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!isAuthReady) {
            setMessage("La conexión de autenticación no está lista.");
            setMessageType("error");
            return;
        }

        setMessage('');
        setMessageType('');

        const email = identifier.trim();
        const pass = password.trim();

        if (!email || !pass) {
            setMessage("Por favor completa todos los campos (debe ser el email).");
            setMessageType("error");
            return;
        }
        
        setIsLoading(true);

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email: email,
                password: pass,
            });

            if (error) {
                throw error;
            }

            setMessage("✔ Sesión iniciada. Redirigiendo a /MEDISENSE...");
            setMessageType("success");

            setTimeout(() => window.location.href = "/MEDISENSE", 1200);

        } catch (error) {
            console.error("Error al iniciar sesión con Supabase:", error);
            
            let displayMessage = GENERIC_ERROR_MSG;
            
            if (error.message && error.message.includes("Invalid login credentials")) {
                displayMessage = GENERIC_ERROR_MSG;
            }

            setMessage(displayMessage);
            setMessageType("error");

        } finally {
            setIsLoading(false);
        }
    };
    
    if (isLoading) {
        return (
             <div className="login-container">
                <div className="text-center p-4 bg-white rounded-lg shadow-md">
                    <p className="text-lg font-semibold text-gray-700">Verificando sesión...</p>
                    <div className="loader mt-3"></div>
                </div>
                <style>{`
                    .loader {
                        border: 4px solid #f3f3f3;
                        border-top: 4px solid #10b981;
                        border-radius: 50%;
                        width: 20px;
                        height: 20px;
                        animation: spin 1s linear infinite;
                        margin: 0 auto;
                    }
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                    .login-container {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        min-height: 100vh;
                        background-color: #f4f7f9;
                    }
                `}</style>
            </div>
        );
    }


    return (
        <>
            <style>{`
                :root {
                    --primary-color: #10b981;
                    --secondary-color: #1a2c42;
                    --background-light: #f4f7f9;
                    --text-color: #333;
                    --error-color: #e53e3e;
                    --success-color: #10b981;
                }

                .login-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    min-height: 100vh;
                    background-color: var(--background-light);
                    padding: 20px;
                    box-sizing: border-box;
                    font-family: 'Inter', sans-serif;
                }

                .login-card {
                    background: #ffffff;
                    padding: 40px;
                    border-radius: 12px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                    width: 100%;
                    max-width: 400px;
                    box-sizing: border-box;
                }

                .login-title {
                    text-align: center;
                    color: var(--secondary-color);
                    margin-bottom: 30px;
                    font-size: 24px;
                    font-weight: 700;
                }

                .form-group {
                    margin-bottom: 20px;
                }

                .form-group label {
                    display: block;
                    margin-bottom: 8px;
                    font-weight: 600;
                    color: var(--text-color);
                    font-size: 14px;
                }

                .form-group input {
                    width: 100%;
                    padding: 12px;
                    border: 1px solid #ccc;
                    border-radius: 8px;
                    box-sizing: border-box;
                    transition: border-color 0.3s;
                }

                .form-group input:focus {
                    border-color: var(--primary-color);
                    outline: none;
                    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2);
                }
                
                .login-button:disabled {
                    background-color: #7ee0bc;
                    cursor: not-allowed;
                }

                .login-button {
                    width: 100%;
                    padding: 12px;
                    background-color: var(--primary-color);
                    color: white;
                    border: none;
                    border-radius: 8px;
                    font-size: 16px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: background-color 0.3s, transform 0.1s;
                    margin-top: 10px;
                }

                .login-button:hover:not(:disabled) {
                    background-color: #0c9c6f;
                }

                .login-button:active:not(:disabled) {
                    transform: translateY(1px);
                }

                .separator {
                    height: 1px;
                    background-color: #eee;
                    margin: 30px 0;
                }

                .register-text {
                    text-align: center;
                    color: var(--text-color);
                    margin-bottom: 15px;
                    font-size: 14px;
                }

                .register-button {
                    display: block;
                    width: 100%;
                    padding: 12px;
                    text-align: center;
                    background-color: var(--secondary-color);
                    color: white;
                    text-decoration: none;
                    border-radius: 8px;
                    font-size: 16px;
                    font-weight: 600;
                    cursor: pointer;
                    border: none;
                    transition: background-color 0.3s;
                }

                .register-button:hover {
                    background-color: #152435;
                }

                .back-button {
                    align-self: flex-start;
                    background: none;
                    border: none;
                    color: var(--secondary-color);
                    cursor: pointer;
                    font-size: 16px;
                    margin-bottom: 20px;
                    transition: color 0.3s;
                }

                .back-button:hover {
                    color: var(--primary-color);
                }

                .message-box {
                    padding: 10px 20px;
                    border-radius: 8px;
                    margin-bottom: 20px;
                    width: 100%;
                    max-width: 400px;
                    text-align: center;
                    font-weight: 500;
                    box-sizing: border-box;
                    opacity: 0.95;
                    animation: fadeIn 0.3s ease-in-out;
                }

                .message-success {
                    background-color: #d1f7e7;
                    color: var(--success-color);
                    border: 1px solid var(--success-color);
                }

                .message-error {
                    background-color: #f8d7da;
                    color: var(--error-color);
                    border: 1px solid var(--error-color);
                }

                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 0.95; transform: translateY(0); }
                }

                @media (max-width: 480px) {
                    .login-card {
                        padding: 25px;
                    }
                    .login-title {
                        font-size: 22px;
                    }
                }
            `}</style>
            <div className="login-container">
                <button onClick={handleGoBack} className="back-button">
                    ← Volver
                </button>

                {message && (
                    <div className={`message-box ${messageType === "success" ? "message-success" : "message-error"}`}>
                        {message}
                    </div>
                )}

                <div className="login-card">
                    <h2 className="login-title">Iniciar Sesión</h2>
                    
                    {/* Mensaje de configuración ya no es necesario aquí */}
                    <p className="text-xs text-center text-red-500 mb-4 bg-yellow-100 p-2 rounded">
                        ⚠️ **ERROR DE COMPILACIÓN ESPERADO:** La importación de Supabase fallará porque `../supabase/supabase` no se puede resolver en este entorno de archivo único.
                    </p>

                    <form onSubmit={handleLogin} className="login-form">
                        <div className="form-group">
                            <label htmlFor="identifier">Email</label>
                            <input
                                id="identifier"
                                type="email"
                                value={identifier}
                                onChange={(e) => setIdentifier(e.target.value)}
                                placeholder="Ingresa tu email registrado"
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

                        <button 
                            type="submit" 
                            className="login-button" 
                            disabled={isLoading || !isAuthReady}
                        >
                            {isLoading ? 'Conectando...' : 'Iniciar Sesión'}
                        </button>
                    </form>

                    <div className="separator"></div>

                    <p className="register-text">¿Aún no tienes cuenta?</p>

                    <button onClick={handleRegisterClick} className="register-button">
                        Crear Cuenta
                    </button>
                </div>
            </div>
        </>
    );
};

export default Login;