import { Card } from 'primereact/card';
// Importaciones de estilos necesarias
import 'primereact/resources/themes/saga-blue/theme.css'; 
import 'primereact/resources/primereact.min.css'; 
import 'primeicons/primeicons.css'; 
import 'primeflex/primeflex.css'; 
import '../css/Contenido.css'; // Importa tus estilos personalizados

import Header2 from '../components/Header2.jsx'; 

const Contenido = () => {

    const features = [
        {
            icon: 'pi pi-chart-line',
            title: 'Diagnóstico Inmediato con IA',
            description: 'Utilizamos poderosos sistemas de Inteligencia Artificial para ayudarte al contar con predicciones y análisis de salud en tiempo real.',
        },
        {
            icon: 'pi pi-user-plus',
            title: 'Consulta Médica Online',
            description: 'Accede a videoconsultas con especialistas certificados. Recibe recetas y seguimiento médico desde la comodidad de tu hogar.',
        },
        {
            icon: 'pi pi-truck',
            title: 'Logística Segura de Fármacos',
            description: 'Coordinación eficiente y segura para la entrega de medicamentos. Garantizamos que tu pedido llegue rápido y en perfectas condiciones.',
        },
    ];

    // Función que renderiza el contenido de la tarjeta de forma vertical
    const renderCardContent = (feature) => (
        // Se centra el contenido usando p-text-center y CSS personalizado
        <div className="p-text-center p-h-100"> 
            
            {/* Contenedor del Icono (Arriba) */}
            <div className="card-icon-wrapper">
                <i className={`${feature.icon} icon-xl`} style={{ color: '#ff8c00' }}></i>
            </div>
            
            {/* Contenido de Texto (Abajo) */}
            <div className="feature-content">
                <h3 className="p-card-title">{feature.title}</h3>
                <p className="p-m-0 p-text-secondary">
                    {feature.description}
                </p>
            </div>
        </div>
    );

    // Renderizado de las diferenciaciones clave
    const renderDifferentiators = () => (
        <div className="diferenciadores-section p-mx-auto p-py-4">
            <h2 className="diferenciaciones-title">Diferenciaciones Clave</h2>
            <ul className="diferenciaciones-list">
                <li><i className="pi pi-check" style={{ color: '#28a745' }}></i> **Confianza Certificada**</li>
                <li><i className="pi pi-check" style={{ color: '#28a745' }}></i> **Precio Fijo y Asequible**</li>
                <li><i className="pi pi-check" style={{ color: '#28a745' }}></i> **Experiencia Omnicanal**</li>
            </ul>
        </div>
    );

    return (
        <div className="medisense-page">
            <Header2/>
            
            {/* Sección Superior: Título y Párrafo */}
            <section className="header-section p-text-center p-py-6 p-px-3">
                <h1 className="p-text-bold">¿Qué es MEDISENSE?</h1>
                <p className="p-text-secondary p-mx-auto header-p">
                    En tres puntos clave resolvemos los problemas de la salud con el uso de la tecnología, para ofrecer una experiencia de atención al paciente que va más allá de lo presencial.
                </p>
            </section>

            {/* Sección de Tarjetas (Features) */}
            <section className="features-section p-grid p-justify-center p-pb-6 p-mx-auto">
                {features.map((feature, index) => (
                    <div key={index} className="p-col-12 p-md-6 p-lg-4 feature-col">
                        <Card 
                            className="p-shadow-3 feature-card"
                        >
                            {renderCardContent(feature)}
                        </Card>
                    </div>
                ))}
            </section>
            
            {/* Sección de Diferenciadores Clave */}
            <section className="p-text-left p-mx-auto" style={{ maxWidth: '950px' }}>
                {renderDifferentiators()}
            </section>
        </div>
    );
}

export default Contenido;