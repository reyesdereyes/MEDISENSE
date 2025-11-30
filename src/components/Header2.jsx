import React, { useState } from 'react';
import '../css/Header2.css'; // Importa el archivo CSS

const Navbar = () => {
    // Estado para controlar si el menú móvil está abierto o cerrado
    const [isOpen, setIsOpen] = useState(false);

    // Función para alternar el estado del menú
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="navbar-container">
            <nav className="navbar">
                
                {/* 1. Logo y Título */}
                <div className="navbar-logo">
                    {/* El icono simple es un placeholder, reemplázalo por tu SVG o <img /> */}
                    {/* Icono de Cruz Aumentado */}
                    <span className="logo-icon">➕</span>
                    <div className="logo-text">
                        {/* Título Principal Aumentado */}
                        <h1>MEDISENSE</h1>
                        <p>Tu Salud, un Clic. Somos Todos.</p>
                    </div>
                </div>

                {/* 2. Enlaces de Navegación */}
                <ul className={`navbar-links ${isOpen ? 'open' : ''}`}>
                    <li><a href="#inicio" className="active" onClick={toggleMenu}>Inicio</a></li>
                    <li><a href="#mision" onClick={toggleMenu}>Nuestra Misión</a></li>
                    <li><a href="#servicios" onClick={toggleMenu}>Servicios</a></li>
                    <li><a href="#medicos" onClick={toggleMenu}>Médicos</a></li>
                    <li><a href="#recursos" onClick={toggleMenu}>Recursos</a></li>
                    <li><a href="#contacto" onClick={toggleMenu}>Contacto</a></li>
                </ul>

                {/* 3. Lupa de Búsqueda */}
                <div className="navbar-actions">
                    <button className="btn-search" aria-label="Buscar">
                        {/* Icono de Lupa simple. Se recomienda usar Lucide-React o un SVG para un look más profesional */}
                        🔍
                    </button>
                </div>

                {/* 4. Botón de Hamburguesa para Móviles */}
                <button className="menu-toggle" onClick={toggleMenu} aria-expanded={isOpen} aria-controls="navbar-links">
                    <span className={`burger-line ${isOpen ? 'open' : ''}`}></span>
                    <span className={`burger-line ${isOpen ? 'open' : ''}`}></span>
                    <span className={`burger-line ${isOpen ? 'open' : ''}`}></span>
                </button>
            </nav>
        </header>
    );
};

export default Navbar;