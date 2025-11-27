import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createClient } from '@supabase/supabase-js';
import "../css/Registro.css";

// Inicializa Supabase con tu URL y Key públicos (usa variables de entorno)
const supabaseUrl = "TU_SUPABASE_URL";
const supabaseAnonKey = "TU_SUPABASE_ANON_KEY";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");
    setMessageType("");

    if (password !== confirmPassword) {
      setMessage("Las contraseñas no coinciden.");
      setMessageType("error");
      return;
    }
    if (!username.trim()) {
      setMessage("El nombre de usuario es requerido.");
      setMessageType("error");
      return;
    }

    // Crear usuario en Supabase Auth
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      setMessage(`Error en registro: ${signUpError.message}`);
      setMessageType("error");
      return;
    }

    // Insertar perfil en tabla profiles con user.id y datos adicionales
    const userId = data.user.id;
    const { error: profileError } = await supabase.from("profiles").insert([
      {
        id: userId,
        full_name: fullName,
        username: username.trim(),
      },
    ]);

    if (profileError) {
      setMessage(`Error guardando perfil: ${profileError.message}`);
      setMessageType("error");
      return;
    }

    setMessage("Registro exitoso. Redirigiendo a Login...");
    setMessageType("success");
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <div className="register-container">
      <button onClick={() => navigate(-1)} className="back-button-inline">
        &larr; Volver
      </button>

      {message && (
        <div
          className={`message-box ${
            messageType === "success" ? "message-success" : "message-error"
          }`}
        >
          {message}
        </div>
      )}

      <div className="register-card">
        <h2 className="register-title">Crear Cuenta</h2>

        <form onSubmit={handleRegister} className="register-form">
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

          <div className="form-group">
            <label htmlFor="username">Nombre de Usuario</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nombre único de usuario"
              required
            />
          </div>

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

          <button type="submit" className="register-button">
            Registrarse
          </button>
        </form>

        <div className="separator"></div>

        <p className="login-text">¿Ya tienes cuenta?</p>
        <Link to="/login" className="login-button-link">
          Iniciar Sesión
        </Link>
      </div>
    </div>
  );
};

export default Register;
