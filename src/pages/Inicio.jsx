import { useState } from 'react'
// RUTA CORREGIDA: Usamos '../' para acceder a la carpeta 'components' desde 'pages'
import Header from '../components/Header.jsx'
import FeatureCard from '../components/FeatureCard.jsx'
import '../App.css'

// IMPORTACIONES DE ICONOS
import { GiBrain, GiAmbulance } from 'react-icons/gi'; 
import { FaUserMd } from 'react-icons/fa'; 

function Inicio() {
  const [count, setCount] = useState(0)

  // 1. Estilos para el banner grande
  const bannerStyle = {
    backgroundColor: 'transparent', 
    color: 'white',
    // Reducimos el paddingTop para acercar el contenido al Header
    paddingTop: '3rem', 
    paddingBottom: '12rem', 
    borderRadius: '0 0 20px 20px',
    marginTop: '0', 
  };

  const titleStyle = {
    fontSize: '5rem', 
    fontWeight: '800',
    marginBottom: '1rem',
  };

  const subtitleStyle = {
    fontSize: '2rem', 
    fontWeight: '400',
    maxWidth: '700px',
  };

  return (
    <>
     \<Header />

      {/* --- SECCIÓN DE BIENVENIDA (BANNER) --- */}
      <div className="hero-container bg-primary-dark"> {/* Añadí la clase de color */}
        <div className="text-center" style={bannerStyle}> 
          <h1 className="display-4" style={titleStyle}>
            Bienvenido a <strong>MEDISENSE</strong>
          </h1>
          <p className="lead mx-auto" style={subtitleStyle}>
            Diagnóstico médico inmediato y envío seguro de medicamentos.
          </p>
        </div>

        {/* --- SECCIÓN DE TARJETAS (FEATURE CARDS) --- */}
        <div className="container feature-cards-wrapper mt-n5 position-relative z-index-3">
          <div className="row justify-content-center">

            {/* Tarjeta 1: Consulta con IA */}
            <FeatureCard
                icon={GiBrain} 
                title="Consulta con IA"
                subtitle="Obtén un diagnóstico con"
                description="Inteligencia artificial"
                // Añadí la clase específica para aplicar estilos de color
                cardClass="bg-white shadow-lg border-0 h-100 p-4 card-ia col-lg-4 col-md-6 mb-4" 
            />
            
          </div>
        </div>
      </div>
    </>
  )
}

export default Inicio