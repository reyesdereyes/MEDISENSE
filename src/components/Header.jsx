import React, { useState } from 'react';
import '../css/Header.css';
import { IoSearch } from 'react-icons/io5'; 
// Importamos RiCloseLine para tener un ícono de "cerrar" para el campo de búsqueda
import { RiCloseLine } from 'react-icons/ri'; 
import { Link } from 'react-router-dom';

const Header = () => {
  // Estado para controlar la visibilidad del campo de búsqueda
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  return (
    <nav className="navbar bg-body-tertiary  py-2 "> 
      <div className="container-fluid">
        {/* Enlace de Marca/Logo */}
        <a className="navbar-brand" href="#">
          <img 
            src="../logo.png" 
            alt="Logo" 
            width="200" 
            height="40" 
            className="d-inline-block align-text-top"
          />
        </a>
        
        {/* Campo de Búsqueda Dinámico */}
        <div className={`search-input-wrapper ${isSearchVisible ? 'visible' : ''}`}>
          <input 
            type="text" 
            placeholder="Buscar..." 
            className="search-input" 
          />
        </div>
        
        {/* Contenedor Flex para los Botones y la Lupa */}
        {/* 'ms-auto' solo se aplica si el campo de búsqueda no es visible completamente, 
           o si queremos mantener un espacio entre el input y los botones */}
        <div className="d-flex align-items-center ms-auto gap-3">
          {/* Botones */}
          <div className={`d-flex gap-2 ${isSearchVisible ? 'buttons-hidden' : ''}`}>
            {/* Botón 1: Iniciar Sesión - Nuevo estilo 'creative-button' */}
            <Link to="/Login"className="creative-button primary" type="button">
              Iniciar Sesión
            </Link>
            
            {/* Botón 2: Registrarse - Nuevo estilo 'creative-button' */}
            <button className="creative-button secondary" type="button"> 
              Registrarse
            </button>
          </div>
          
          {/* ÍCONO DE LUPA/CERRAR - Ahora es funcional */}
          <div className="search-icon-container" onClick={toggleSearch}>
            {isSearchVisible ? (
              <RiCloseLine size={28} className="search-icon close-icon" /> // Ícono de cerrar cuando está activo
            ) : (
              <IoSearch size={24} className="search-icon" /> // Ícono de lupa cuando está inactivo
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;