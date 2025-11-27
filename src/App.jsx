import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx'; // Importación corregida en App.jsx
import './App.css';
import Inicio from './pages/Inicio.jsx';
import Login from './pages/Login.jsx'; 
import Registro from './pages/Registro.jsx'; 

function App() {
  return (
    // BrowserRouter debe envolver toda la aplicación para habilitar las rutas
    <BrowserRouter>
        {/* Header se queda fuera de <Routes> para ser visible en todas las páginas */}
        <Routes>
            {/* Ruta de inicio */}
            <Route path="/" element={<Inicio/>} /> 
            <Route path="/login" element={<Login/>} />
            <Route path="/registro" element={<Registro/>} />
            {/* Aquí agregarías más rutas: /medicos, /consulta-ia, etc. */}
        </Routes>
    </BrowserRouter>
  )
}

export default App