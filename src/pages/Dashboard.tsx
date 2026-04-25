
import { Users, BookOpen, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="animate-slide-up">
      <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Panel de Control</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem' }}>Bienvenido al sistema de administración académica.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        
        <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3B82F6' }}>
            <Users size={32} />
          </div>
          <h2>Gestión de Alumnos</h2>
          <p>Administra los perfiles de los estudiantes, crea nuevos registros o actualiza los existentes.</p>
          <Link to="/alumnos" style={{ marginTop: 'auto', textDecoration: 'none' }}>
            <button className="btn-primary" style={{ width: '100%' }}>Ir a Alumnos</button>
          </Link>
        </div>

        <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981' }}>
            <BookOpen size={32} />
          </div>
          <h2>Gestión de Materias</h2>
          <p>Controla el catálogo de materias disponibles, sus códigos y los créditos académicos.</p>
          <Link to="/materias" style={{ marginTop: 'auto', textDecoration: 'none' }}>
            <button className="btn-primary" style={{ width: '100%', background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', boxShadow: '0 4px 15px rgba(16, 185, 129, 0.4)' }}>Ir a Materias</button>
          </Link>
        </div>

        <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: 'rgba(245, 158, 11, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F59E0B' }}>
            <GraduationCap size={32} />
          </div>
          <h2>Gestión de Notas</h2>
          <p>Registra y consulta las calificaciones de los alumnos en sus respectivas materias.</p>
          <Link to="/notas" style={{ marginTop: 'auto', textDecoration: 'none' }}>
            <button className="btn-primary" style={{ width: '100%', background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)', boxShadow: '0 4px 15px rgba(245, 158, 11, 0.4)' }}>Ir a Notas</button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
