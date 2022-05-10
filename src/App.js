import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import NuevaEvaluacion from './pages/NuevaEvaluacion'
import AcercaDe from './pages/AcercaDe'
import AdminCarteles from './pages/AdminCarteles'
import AdminJueces from './pages/AdminJueces'
import AdminPreguntas from './pages/AdminPreguntas'
import Evaluaciones from './pages/Evaluaciones'
import TiposCarteles from './pages/TiposCarteles'
import Dashboard from './pages/Dashboard'
import EvaluacionForma from './pages/EvaluacionForma';
import EvaluacionContenido from './pages/EvaluacionContenido';
import EvaluacionPertinencia from './pages/EvaluacionPertinencia'
import ResumenEvaluacion from './pages/ResumenEvaluacion'
import AdminPuntajes from './pages/AdminPuntajes'
import './App.css';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/NuevaEvaluacion" element={<NuevaEvaluacion />}></Route>
          <Route path="/AcercaDe" element={<AcercaDe />}></Route>
          <Route path="/AdminCarteles" element={<AdminCarteles />}></Route>
          <Route path="/AdminJueces" element={<AdminJueces />}></Route>
          <Route path="/AdminPreguntas" element={<AdminPreguntas />}></Route>
          <Route path="/Evaluaciones" element={<Evaluaciones />}></Route>
          <Route path="/TiposCarteles" element={<TiposCarteles />}></Route>
          <Route path="/AdminPuntajes" element={<AdminPuntajes />}></Route>
          <Route path="/Dashboard" element={<Dashboard />}></Route>
          <Route path="/EvaluacionForma/:clave/:tipo" element={<EvaluacionForma />}></Route>
          <Route path="/EvaluacionContenido/:clave/:tipo" element={<EvaluacionContenido />}></Route>
          <Route path="/EvaluacionPertinencia/:clave/:tipo" element={<EvaluacionPertinencia />}></Route>
          <Route path="/ResumenEvaluacion/:clave/:tipo" element={<ResumenEvaluacion />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
