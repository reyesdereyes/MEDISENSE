import { BrowserRouter, Routes, Route, Router } from 'react-router-dom';
import './App.css';
import Login from './pages/Login.jsx'; 
import Principal from './pages/Principal.jsx';
import Register from './pages/Register.jsx';
import Conte from './pages/conte.jsx';


function App() {
  return (
    // BrowserRouter debe envolver toda la aplicación para habilitar las rutas
    <BrowserRouter>
        {/* Header se queda fuera de <Routes> para ser visible en todas las páginas */}
        <Routes>
            {/* Ruta de inicio */}
            <Route path="/" element={<Principal/>} /> 
            <Route path="/login" element={<Login/>} />
            <Route path="/registro" element={<Register/>} />
            <Route path="/MEDISENSE" element={<Conte/>} />
            {/* Aquí agregarías más rutas: /medicos, /consulta-ia, etc. */}
        </Routes>
    </BrowserRouter>
  )
}

export default App