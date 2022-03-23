import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import NuevaEvaluacion from './pages/NuevaEvaluacion'
import AcercaDe from './pages/AcercaDe'
import AdminCarteles from './pages/AdminCarteles'
import AdminJueces from './pages/AdminJueces'
import AdminPreguntas from './pages/AdminPreguntas'
import Evaluaciones from './pages/Evaluaciones'
import TiposCarteles from './pages/TiposCarteles'
import Dashboard from './pages/Dashboard'
import './App.css';
 
function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact component={NuevaEvaluacion}></Route>
          <Route path="/AcercaDe" component={AcercaDe}></Route>
          <Route path="/AdminCarteles" component={AdminCarteles}></Route>
          <Route path="/AdminJueces" component={AdminJueces}></Route>
          <Route path="/AdminPreguntas" component={AdminPreguntas}></Route>
          <Route path="/Evaluaciones" component={Evaluaciones}></Route>
          <Route path="/TiposCarteles" component={TiposCarteles}></Route>
          <Route path="/Dashboard" component={Dashboard}></Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
