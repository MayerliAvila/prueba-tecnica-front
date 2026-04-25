
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import AlumnosPage from './pages/AlumnosPage';
import MateriasPage from './pages/MateriasPage';
import NotasPage from './pages/NotasPage';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="alumnos" element={<AlumnosPage />} />
          <Route path="materias" element={<MateriasPage />} />
          <Route path="notas" element={<NotasPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
