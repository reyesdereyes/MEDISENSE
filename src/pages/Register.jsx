import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import supabase from "../supabase/supabase";
import "../css/Registro.css";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  // Nuevos campos opcionales
  const [cedula, setCedula] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // Seguridad y UI
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

    const cleanCedula = cedula.trim() || null;
    const cleanPhone = phoneNumber.trim() || null;

    // Crear usuario en Auth
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      setMessage(`Error en registro: ${signUpError.message}`);
      setMessageType("error");
      return;
    }

    if (!data.user) {
      setMessage(
        "Registro exitoso. Revisa tu correo para verificar tu cuenta."
      );
      setMessageType("success");
      setTimeout(() => navigate("/login"), 3000);
      return;
    }

    // Insertar perfil en tabla
    const userId = data.user.id;

    const { error: profileError } = await supabase.from("profiles").insert([
      {
        id: userId,
        full_name: fullName,
        username: username.trim(),
        email,
        cedula: cleanCedula,
        phone_number: cleanPhone,
      },
    ]);

    if (profileError) {
      setMessage(
        `Error guardando perfil. Contacta soporte. ${profileError.message}`
      );
      setMessageType("error");
      return;
    }

    setMessage("Registro exitoso. Redirigiendo...");
    setMessageType("success");
    setTimeout(() => navigate("/"), 2000);
  };

  return (
    <div className="register-container">

      {/* Botón atrás */}
      <button onClick={() => navigate(-1)} className="back-button-inline">
        &larr; Volver
      </button>

      {/* Mensaje dinámico */}
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
              placeholder="Usuario único"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="correo@ejemplo.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="cedula">Cédula (Opcional)</label>
            <input
              type="text"
              id="cedula"
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
              placeholder="Número de identificación"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phoneNumber">Teléfono (Opcional)</label>
            <input
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Ej: +58 412 1234567"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Crea una contraseña segura"
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
              placeholder="Repite la contraseña"
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
