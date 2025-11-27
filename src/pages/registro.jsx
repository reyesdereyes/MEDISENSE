import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Registro.css'; // LA RUTA AHORA DEBERÍA RESOLVERSE

const Registro = () => {
    // Estado para capturar los valores del formulario
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const navigate = useNavigate();

    // Función para manejar el envío del formulario
    const handleRegister = (e) => {
        e.preventDefault();
        setMessage('');
        setMessageType('');

        if (password !== confirmPassword) {
            setMessage('Las contraseñas no coinciden.');
            setMessageType('error');
            return;
        }

        // Lógica de registro/API iría aquí
        
        setMessage('Registro simulado exitoso. Redirigiendo a Login...');
        setMessageType('success');
        console.log('Intentando registrar usuario:', { fullName, email });
        
        // Simulación de navegación a la página de Login después del registro
        setTimeout(() => {
            navigate('/login'); 
        }, 2000); 
    };

    return (
        <div className="register-container">
            {/* Botón Volver */}
            <button 
                onClick={() => navigate(-1)} 
                className="back-button-inline"
            >
                &larr; Volver
            </button>

            {/* Mensaje de estado */}
            {message && (
                <div className={`message-box ${messageType === 'success' ? 'message-success' : 'message-error'}`}>
                    {message}
                </div>
            )}

            {/* Tarjeta de Registro */}
            <div className="register-card">
                <h2 className="register-title">Crear Cuenta</h2>
                
                <form onSubmit={handleRegister} className="register-form">
                    
                    {/* Campo Nombre Completo */}
                    <div className="form-group">
                        <label htmlFor="fullName">Nombre Completo</label>
                        <input
                            type="text"
                            id="fullName"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="Nombre y Apellido"
                            required
                        />
                    </div>
                    
                    {/* Campo Email */}
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Tu correo electrónico"
                            required
                        />
                    </div>
                    
                    {/* Campo Contraseña */}
                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Crea tu contraseña segura"
                            required
                        />
                    </div>

                    {/* Campo Confirmar Contraseña */}
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Repite tu contraseña"
                            required
                        />
                    </div>
                    
                    {/* Botón Registrarse */}
                    <button type="submit" className="register-button">
                        Registrarse
                    </button>
                </form>

                <div className="separator"></div>

                {/* Sección de Iniciar Sesión */}
                <p className="login-text">
                    ¿Ya tienes cuenta?
                </p>
                {/* Usamos Link para navegar a la página de login */}
                <Link to="/login" className="login-button-link">
                    Iniciar Sesión
                </Link>
            </div>
        </div>
    );
};

export default Registro;