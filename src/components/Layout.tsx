
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, Users, BookOpen, GraduationCap } from 'lucide-react';

const Layout = () => {
  return (
    <div className="app-layout">
      <aside className="sidebar glass-panel" style={{ borderRadius: 0, borderTop: 0, borderBottom: 0, borderLeft: 0 }}>
        <div>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--accent-primary)', fontFamily: 'Outfit' }}>
            <GraduationCap size={28} />
            EduAdmin
          </h2>
          <p style={{ fontSize: '0.875rem', marginTop: '-0.5rem' }}>Gestor de Alumnos y Notas</p>
        </div>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '2rem' }}>
          <NavLink 
            to="/" 
            className={({isActive}) => isActive ? 'btn-primary' : 'btn-secondary'}
            style={{ justifyContent: 'flex-start', padding: '0.85rem 1rem' }}
          >
            <LayoutDashboard size={20} /> Dashboard
          </NavLink>
          <NavLink 
            to="/alumnos" 
            className={({isActive}) => isActive ? 'btn-primary' : 'btn-secondary'}
            style={{ justifyContent: 'flex-start', padding: '0.85rem 1rem' }}
          >
            <Users size={20} /> Alumnos
          </NavLink>
          <NavLink 
            to="/materias" 
            className={({isActive}) => isActive ? 'btn-primary' : 'btn-secondary'}
            style={{ justifyContent: 'flex-start', padding: '0.85rem 1rem' }}
          >
            <BookOpen size={20} /> Materias
          </NavLink>
          <NavLink 
            to="/notas" 
            className={({isActive}) => isActive ? 'btn-primary' : 'btn-secondary'}
            style={{ justifyContent: 'flex-start', padding: '0.85rem 1rem' }}
          >
            <GraduationCap size={20} /> Notas
          </NavLink>
        </nav>
      </aside>
      
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
