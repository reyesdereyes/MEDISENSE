import { useState, useEffect } from 'react'
import Header from '../components/Header.jsx'
import FeatureCard from '../components/FeatureCard.jsx'
import { GiBrain } from 'react-icons/gi'

function Principal() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Banner + página completa
  const pageStyle = {
    backgroundColor: '#0056b3', // azul de fondo
    minHeight: '100vh',
    margin: 0,
    padding: 0,
    color: '#ffffff',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
  }

  const bannerStyle = {
    paddingTop: windowWidth < 768 ? '2rem' : '4rem',
    paddingBottom: windowWidth < 768 ? '4rem' : '12rem',
    borderRadius: '0 0 20px 20px',
  }

  const titleStyle = {
    fontSize: windowWidth < 768 ? '2.5rem' : '5rem',
    fontWeight: '800',
    marginBottom: '1rem',
    color: '#ffffff',
    textShadow: '0 2px 6px rgba(0,0,0,0.3)',
  }

  const subtitleStyle = {
    fontSize: windowWidth < 768 ? '1.2rem' : '2rem',
    fontWeight: '400',
    maxWidth: windowWidth < 768 ? '90vw' : '700px',
    marginLeft: 'auto',
    marginRight: 'auto',
    color: '#ffffff',
    textShadow: '0 1px 4px rgba(0,0,0,0.2)',
  }

  return (
    <div style={pageStyle}>
      <Header />

      <div style={bannerStyle}>
        <h1 style={titleStyle}>
          Bienvenido a <strong>MEDISENSE</strong>
        </h1>
        <p style={subtitleStyle}>
          Diagnóstico médico inmediato y envío seguro de medicamentos.
        </p>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '1.5rem',
            marginTop: '-3rem',
          }}
        >
          <FeatureCard
            icon={GiBrain}
            title="Consulta con IA"
            subtitle="Obtén un diagnóstico con"
            description="Inteligencia artificial"
            cardClass={`shadow-lg border-0 h-100 p-4 card-ia col-lg-4 col-md-6 mb-4 ${windowWidth < 768 ? 'col-12' : ''}`}
            style={{ backgroundColor: 'rgba(255,255,255,0.05)', color: '#fff' }}
          />
        </div>
      </div>
    </div>
  )
}

export default Principal
