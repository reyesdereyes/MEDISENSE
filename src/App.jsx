import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login.jsx'; 
import Principal from './pages/Principal.jsx';
import Register from './pages/Register.jsx';


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
            {/* Aquí agregarías más rutas: /medicos, /consulta-ia, etc. */}
        </Routes>
    </BrowserRouter>
  )
}

export default App