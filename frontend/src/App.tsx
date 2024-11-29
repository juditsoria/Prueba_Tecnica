import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import RecordDetail from "./pages/RecordDetail";
import './App.css';
import Login from './pages/Login';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Ruta principal para mostrar la lista de registros */}
          <Route path="/" element={<Home />} />

          {/* Ruta para los detalles de un registro específico */}
          <Route path="/record/:id" element={<RecordDetail />} />

              {/* Ruta para el login */}
              <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
