import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx'; // Importación corregida en App.jsx
import './App.css';
import Inicio from './pages/Inicio.jsx';
import Login from './pages/Login.jsx'; 
import Registro from './pages/Registro.jsx'; // Mayúscula R para coincidir con archivo

function App() {
  return (
    <BrowserRouter>
      <Header /> {/* Header fuera de Routes para estar visible siempre */}
      <Routes>
        <Route path="/" element={<Inicio />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        {/* Otras rutas aquí */}
      </Routes>
    </BrowserRouter>
  )
}

export default App;
