import { useState, useEffect } from 'react' 
import Header from '../components/Header.jsx'
import FeatureCard from '../components/FeatureCard.jsx'
import { GiBrain } from 'react-icons/gi'

function Inicio() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Estilos adaptativos para banner basado en el ancho
  const bannerStyle = {
    backgroundColor: 'transparent',
    color: 'white',
    paddingTop: windowWidth < 768 ? '1.5rem' : '3rem',
    paddingBottom: windowWidth < 768 ? '4rem' : '12rem',
    borderRadius: '0 0 20px 20px',
    marginTop: '0',
    textAlign: 'center',
  }

  // Título adaptativo
  const titleStyle = {
    fontSize: windowWidth < 768 ? '2.5rem' : '5rem',
    fontWeight: '800',
    marginBottom: '1rem',
  };

  // Subtítulo adaptable
  const subtitleStyle = {
    fontSize: windowWidth < 768 ? '1.2rem' : '2rem',
    fontWeight: '400',
    maxWidth: windowWidth < 768 ? '90vw' : '700px',
    marginLeft: 'auto',
    marginRight: 'auto',
  };

  // Para las tarjetas, se recomienda en móviles que ocupen 100% ancho con margen abajo
  // ese estilo debe estar en el FeatureCard o container, se podría controlar pasando props

  return (
    <>
      <Header />

      <div className="hero-container bg-primary-dark" style={bannerStyle}>
        <div style={{ width: '100%' }}>
          <h1 className="display-4" style={titleStyle}>
            Bienvenido a <strong>MEDISENSE</strong>
          </h1>
          <p className="lead mx-auto" style={subtitleStyle}>
            Diagnóstico médico inmediato y envío seguro de medicamentos.
          </p>
        </div>

        <div className="container feature-cards-wrapper mt-n5 position-relative z-index-3">
          <div className="row justify-content-center">
            <FeatureCard
              icon={GiBrain}
              title="Consulta con IA"
              subtitle="Obtén un diagnóstico con"
              description="Inteligencia artificial"
              cardClass={`bg-white shadow-lg border-0 h-100 p-4 card-ia col-lg-4 col-md-6 mb-4 ${windowWidth < 768 ? 'col-12' : ''}`}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Inicio
