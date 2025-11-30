import { Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login.jsx'; 
import Principal from './pages/Principal.jsx';
import Register from './pages/Register.jsx';


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Principal />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
      
      </Routes>
    </>
  );
}

export default App;
