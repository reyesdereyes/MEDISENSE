import React, { useState } from 'react';
import '../css/Header2.css'; // Solo estilos personalizados

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <header className="navbar-container">
            <nav className="navbar">
                {/* Logo */}
                <div className="navbar-logo">
                    <img src="/logo1.svg" alt="Logo Medisense" className="logo-img" />
                </div>

                {/* Menú de enlaces */}
                <ul className={`navbar-links ${isOpen ? 'open' : ''}`} id="navbar-links">
                    <li><a href="#inicio" className="active" onClick={toggleMenu}>Inicio</a></li>
                    <li><a href="#mision" onClick={toggleMenu}>Nuestra Misión</a></li>
                    <li><a href="#servicios" onClick={toggleMenu}>Servicios</a></li>
                    <li><a href="#medicos" onClick={toggleMenu}>Médicos</a></li>
                    <li><a href="#recursos" onClick={toggleMenu}>Recursos</a></li>
                    <li><a href="#contacto" onClick={toggleMenu}>Contacto</a></li>
                </ul>

                {/* Lupa */}
                <div className="navbar-actions">
                    <button className="btn-search" aria-label="Buscar">🔍</button>
                </div>

                {/* Botón hamburguesa */}
                <button className="menu-toggle" onClick={toggleMenu} aria-expanded={isOpen} aria-controls="navbar-links">
                    {isOpen ? '✖' : '☰'}
                </button>
            </nav>
        </header>
    );
};

export default Navbar;
