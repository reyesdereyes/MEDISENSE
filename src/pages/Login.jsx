import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Login.css';

const Login = () => {
  // Estado para capturar los valores del formulario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Función para manejar el envío del formulario
  const handleLogin = (e) => {
    e.preventDefault();
    // Lógica de autenticación/API iría aquí
    alert('Autenticación simulada exitosa. Redirigiendo...');
    console.log('Intentando iniciar sesión con:', { email, password });
    
    // Simulación de navegación al inicio después de login
    navigate('/'); 
  };

  return (
    <div className="login-container">
      {/* Botón Volver - Usa useNavigate para volver a la ruta anterior */}
      <button 
        onClick={() => navigate(-1)} 
        className="back-button"
      >
        &larr; Volver
      </button>

      {/* Tarjeta de Login */}
      <div className="login-card">
        <h2 className="login-title">Iniciar Sesión</h2>
        
        <form onSubmit={handleLogin} className="login-form">
          
          {/* Campo Usuario o Email */}
          <div className="form-group">
            <label htmlFor="email">Usuario o Email</label>
            <input
              type="email" // Usamos 'email' para validación, pero el placeholder acepta 'usuario'
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingresa tu usuario o email"
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
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>
          
          {/* Botón Iniciar Sesión */}
          <button type="submit" className="login-button">
            Iniciar Sesión
          </button>
        </form>

        <div className="separator"></div>

        {/* Sección de Registro */}
        <p className="register-text">
          ¿Aún no tienes cuenta?
        </p>
        {/* Usamos Link para navegar a la página de registro (debes crearla) */}
        <Link to="/register" className="register-button">
          Registrarse
        </Link>
      </div>
    </div>
  );
};

export default Login;