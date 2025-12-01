import React, { useState, useEffect } from "react";
import supabase from "../supabase/supabase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  // 🔍 Verificar sesión activa
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        window.location.href = "/contenido";
      }
    };
    checkSession();
  }, []);

  // 🔐 Login
  const handleLogin = async (e) => {
    e.preventDefault();

    // Validación de campos
    if (!email || !password) {
      setMessage("Por favor completa todos los campos.");
      setType("error");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setMessage("Correo inválido.");
      setType("error");
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Login error:", error);
        setMessage(error.message);
        setType("error");
        return;
      }

      if (data.session) {
        setMessage("Inicio de sesión exitoso.");
        setType("success");
        setTimeout(() => {
          window.location.href = " /contenido";
        }, 800);
      }
    } catch (err) {
      console.error("Error inesperado:", err);
      setMessage("Error de conexión con el servidor.");
      setType("error");
    }
  };

  return (
    <div className="login-container">
      <style>{`
        :root {
          --primary: #10b981;
          --dark: #1a2c42;
        }
        body { margin: 0; font-family: Inter, sans-serif; }
        .login-container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #f4f7f9;
          padding: 20px;
        }
        .card {
          background: #ffffff;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0px 8px 25px rgba(0,0,0,.1);
          width: 100%;
          max-width: 380px;
        }
        .title {
          text-align: center;
          color: var(--dark);
          font-size: 24px;
          margin-bottom: 25px;
          font-weight: 700;
        }
        input {
          width: 100%;
          padding: 12px;
          margin-bottom: 15px;
          border: 1px solid #ccc;
          border-radius: 8px;
          transition: .2s;
        }
        input:focus {
          border-color: var(--primary);
          outline: none;
          box-shadow: 0 0 0 3px rgba(16,185,129,.3);
        }
        .btn {
          width: 100%;
          padding: 12px;
          background: var(--primary);
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          transition: .3s;
        }
        .btn:hover { background: #0c9c6f; }
        .msg {
          padding: 12px;
          border-radius: 8px;
          margin-bottom: 20px;
          text-align: center;
          font-weight: 600;
        }
        .error { background: #f8d7da; color: #b52a2a; }
        .success { background: #d1f7e7; color: #0d6848; }
        .register {
          text-align: center;
          margin-top: 15px;
        }
        .register-btn {
          margin-top: 10px;
          display: block;
          background: var(--dark);
          padding: 12px;
          text-align: center;
          color: white;
          border-radius: 8px;
          cursor: pointer;
        }
      `}</style>

      <div className="card">
        <h2 className="title">Iniciar Sesión</h2>

        {message && <div className={`msg ${type}`}>{message}</div>}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="btn">Ingresar</button>
        </form>

        <div className="register">
          ¿No tienes cuenta?
          <a href="/registro" className="register-btn">Crear Cuenta</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
