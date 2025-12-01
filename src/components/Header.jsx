import React, { useState, useRef, useEffect } from 'react';
import '../css/Header.css';
import { FiMenu } from 'react-icons/fi'; 
import { RiCloseLine } from 'react-icons/ri'; 
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        if (!event.target.closest('.menu-icon-container')) {
          setIsMenuOpen(false);
        }
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  return (
    <header className="header">
      <div className="container">
        {/* Logo */}
        <Link to="/" className="logo-link">
          <img src="public/Diseño sin título (3).svg" alt="MEDISENSE Logo" />
        </Link>

        {/* Botones de escritorio */}
        <nav className="nav-links">
          <Link to="/login" className="creative-button primary">Iniciar Sesión</Link>
          <Link to="/registro" className="creative-button secondary">Registrarse</Link>
        </nav>

        {/* Icono menú móvil */}
        <div className="menu-icon-container" onClick={toggleMenu}>
          {isMenuOpen ? <RiCloseLine size={28} /> : <FiMenu size={24} />}
        </div>

        {/* Menú lateral móvil */}
        <div ref={menuRef} className={`off-canvas-menu ${isMenuOpen ? 'open' : ''}`}>
          <Link to="/login" className="creative-button primary menu-btn" onClick={toggleMenu}>Iniciar Sesión</Link>
          <Link to="/registro" className="creative-button secondary menu-btn" onClick={toggleMenu}>Registrarse</Link>
        </div>

        {/* Overlay oscuro */}
        <div className={`menu-overlay ${isMenuOpen ? 'visible' : ''}`} onClick={toggleMenu}></div>
      </div>
    </header>
  );
};

export default Header;
