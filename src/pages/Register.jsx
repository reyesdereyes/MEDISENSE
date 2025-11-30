import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import supabase from "../supabase/supabase";
import "../css/Registro.css";

const Register = () => {
  // Estados
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [cedula, setCedula] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");
    setMessageType("");

    // Validaciones previas
    if (!fullName.trim()) {
      setMessage("El nombre completo es requerido.");
      setMessageType("error");
      return;
    }

    if (!username.trim()) {
      setMessage("El nombre de usuario es requerido.");
      setMessageType("error");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Las contraseñas no coinciden.");
      setMessageType("error");
      return;
    }

    // Validar formato de Email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage("Por favor, ingresa un formato de correo electrónico válido.");
      setMessageType("error");
      return;
    }

    // Validar longitud mínima de Contraseña
    if (password.length < 6) {
      setMessage("La contraseña debe tener al menos 6 caracteres.");
      setMessageType("error");
      return;
    }

    const cleanCedula = cedula.trim() || null;
    const cleanPhone = phoneNumber.trim() || null;

    try {
      // 1. Verificar duplicado de username
      const { data: existingUser } = await supabase
        .from("profiles")
        .select("id")
        .eq("username", username.trim())
        .single();

      if (existingUser) {
        setMessage("Ese nombre de usuario ya está en uso.");
        setMessageType("error");
        return;
      }

      // 2. Crear usuario en Auth
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        console.error("Error en registro:", signUpError.message);
        setMessage(`Error en registro: ${signUpError.message}`);
        setMessageType("error");
        return;
      }

      // Caso A: Confirmación de correo activada
      if (!data.user) {
        setMessage(
          "Registro exitoso. Revisa tu correo para verificar tu cuenta e iniciar sesión."
        );
        setMessageType("success");
        setTimeout(() => navigate("/login"), 3000);
        return;
      }

      // Caso B: Confirmación desactivada → insertar perfil
      const userId = data.user.id;

      const { error: profileError } = await supabase.from("profiles").insert([
        {
          id: userId,
          full_name: fullName.trim(),
          username: username.trim(),
          email,
          cedula: cleanCedula,
          phone_number: cleanPhone,
        },
      ]);

      if (profileError) {
        console.error("Error guardando perfil:", profileError.message);
        setMessage(
          `Error guardando perfil. Contacta soporte. ${profileError.message}`
        );
        setMessageType("error");
        return;
      }

      setMessage("✔ Registro y sesión iniciada exitosos. Redirigiendo...");
      setMessageType("success");
      setTimeout(() => navigate("/"), 2000);

    } catch (err) {
      console.error("Error inesperado en registro:", err);
      setMessage("Ocurrió un error inesperado. Inténtalo de nuevo.");
      setMessageType("error");
    }
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
              placeholder="Cédula"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phoneNumber">Teléfono (Opcional)</label>
            <input
              type="text"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Teléfono"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
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
            Crear Cuenta
          </button>
        </form>

        <div className="separator"></div>

        <p className="login-text">¿Ya tienes cuenta?</p>
        <Link to="/Login" className="login-button">
          Iniciar Sesión
        </Link>
      </div>
    </div>
  );
};

export default Register;
