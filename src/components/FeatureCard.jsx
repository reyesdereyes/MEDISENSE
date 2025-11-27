import React from 'react';
// Importamos los íconos necesarios
import { GiBrain, GiAmbulance } from 'react-icons/gi'; 
import { FaUserMd } from 'react-icons/fa';

// Importamos el archivo CSS
import '../css/HeroSection.css'; 

const FeatureCard = ({ icon: Icon, title, subtitle, description, cardClass }) => (
    // Col-lg-4 para que ocupen 1/3 del ancho en pantallas grandes
    <div className={`col-lg-4 col-md-6 mb-4`}>
        <div className={`feature-card ${cardClass}`}>
            <div className="icon-wrapper mb-3">
                <Icon size={40} className="card-icon" />
            </div>
            
            <h3 className="card-title">{title}</h3>
            <p className="card-subtitle">{subtitle}</p>
            <p className="card-description">{description}</p>
        </div>
    </div>
);

const HeroSection = () => {
  return (

    <div className="container feature-cards-wrapper py-5">
      <div className="row justify-content-center">

          {/* Tarjeta 1: Consulta con IA (Fondo Blanco) */}
          <FeatureCard
              icon={GiBrain}
              title="Consulta con IA"
              subtitle="Obtén un diagnóstico con"
              description="Inteligencia artificial"
              cardClass="card-ia"
          />

          {/* Tarjeta 2: Consulta médica online (Fondo Azul) */}
          <FeatureCard
              icon={FaUserMd}
              title="Consulta médica online"
              subtitle="Médicos certificados* en"
              description="+15 especialidades"
              cardClass="card-medico"
          />

          {/* Tarjeta 3: Envío seguro de medicamentos (Fondo Azul) */}
          <FeatureCard
              icon={GiAmbulance}
              title="Envío seguro de medicamentos"
              subtitle="A las principales"
              description="ciudades de Venezuela"
              cardClass="card-envio"
          />

      </div>
    </div>
  );
};

export default HeroSection;