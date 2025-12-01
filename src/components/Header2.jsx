import React, { useState } from 'react';
import '../css/Header2.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(prev => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="navbar-container">
      <nav className="navbar">
        {/* Logo */}
        <div className="navbar-logo">
          <img
            src="/logo1.svg"
            alt="Logo Medisense"
            className="logo-img"
          />
        </div>

        {/* Menú de enlaces */}
        <ul
          id="navbar-links"
          className={`navbar-links ${isOpen ? 'open' : ''}`}
        >
          <li><a href="#inicio" className="active" onClick={closeMenu}>Inicio</a></li>
          <li><a href="#mision" onClick={closeMenu}>Nuestra Misión</a></li>
          <li><a href="#servicios" onClick={closeMenu}>Servicios</a></li>
          <li><a href="#medicos" onClick={closeMenu}>Médicos</a></li>
          <li><a href="#recursos" onClick={closeMenu}>Recursos</a></li>
          <li><a href="#contacto" onClick={closeMenu}>Contacto</a></li>
        </ul>

        {/* Agrupar lupa + hamburguesa */}
        <div className="navbar-right">
          <div className="navbar-actions">
            <button
              className="btn-search"
              aria-label="Buscar"
              type="button"
            >
              🔍
            </button>
          </div>

          <button
            className="menu-toggle"
            type="button"
            onClick={toggleMenu}
            aria-expanded={isOpen}
            aria-controls="navbar-links"
          >
            {isOpen ? '✖' : '☰'}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
