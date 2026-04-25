import { useEffect, useState } from 'react';
import type { Alumno } from '../types';
import * as alumnosService from '../services/alumnosService';
import Modal from '../components/Modal';
import { Plus, Edit2, Trash2 } from 'lucide-react';

const AlumnosPage = () => {
  const [alumnos, setAlumnos] = useState<Alumno[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAlumno, setEditingAlumno] = useState<Alumno | null>(null);
  
  const [formData, setFormData] = useState({ nombre: '', apellido: '', email: '', fecha_nacimiento: '' });

  const loadAlumnos = async () => {
    try {
      const data = await alumnosService.getAlumnos();
      setAlumnos(data);
    } catch (error) {
      console.error('Failed to load alumnos:', error);
    }
  };

  useEffect(() => {
    loadAlumnos();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingAlumno) {
        await alumnosService.updateAlumno(editingAlumno.id, formData);
      } else {
        await alumnosService.createAlumno(formData);
      }
      setIsModalOpen(false);
      setEditingAlumno(null);
      setFormData({ nombre: '', apellido: '', email: '', fecha_nacimiento: '' });
      loadAlumnos();
    } catch (error) {
      console.error('Failed to save alumno:', error);
      alert('Error guardando alumno. Revisa la consola.');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de eliminar este alumno?')) {
      try {
        await alumnosService.deleteAlumno(id);
        loadAlumnos();
      } catch (error) {
        console.error('Failed to delete alumno:', error);
      }
    }
  };

  const openEditModal = (alumno: Alumno) => {
    setEditingAlumno(alumno);
    setFormData({ 
      nombre: alumno.nombre, 
      apellido: alumno.apellido, 
      email: alumno.email, 
      fecha_nacimiento: alumno.fecha_nacimiento 
    });
    setIsModalOpen(true);
  };

  const openCreateModal = () => {
    setEditingAlumno(null);
    setFormData({ nombre: '', apellido: '', email: '', fecha_nacimiento: '' });
    setIsModalOpen(true);
  };

  return (
    <div className="animate-slide-up" style={{ width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ margin: 0 }}>Gestión de Alumnos</h1>
        <button className="btn-primary" onClick={openCreateModal}>
          <Plus size={15} /> Nuevo Alumno
        </button>
      </div>

      <div className="glass-panel premium-table-container">
        <table className="premium-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Email</th>
              <th>Fecha Nac.</th>
              <th style={{ textAlign: 'right' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {alumnos.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '3rem' }}>No hay alumnos registrados.</td>
              </tr>
            ) : alumnos.map(alumno => (
              <tr key={alumno.id}>
                <td><span className="badge badge-primary">#{alumno.id}</span></td>
                <td style={{ fontWeight: 500, color: '#fff' }}>{alumno.nombre}</td>
                <td>{alumno.apellido}</td>
                <td>{alumno.email}</td>
                <td>{alumno.fecha_nacimiento ? new Date(alumno.fecha_nacimiento).toLocaleDateString() : 'N/A'}</td>
                <td style={{ textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: '0.25rem', justifyContent: 'flex-end' }}>
                    <button className="btn-icon" onClick={() => openEditModal(alumno)}>
                      <Edit2 size={18} color="var(--accent-primary)" />
                    </button>
                    <button className="btn-icon" onClick={() => handleDelete(alumno.id)}>
                      <Trash2 size={18} color="var(--danger)" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={editingAlumno ? 'Editar Alumno' : 'Nuevo Alumno'}
      >
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre</label>
            <input 
              required
              type="text" 
              value={formData.nombre} 
              onChange={e => setFormData({...formData, nombre: e.target.value})} 
            />
          </div>
          <div className="form-group">
            <label>Apellido</label>
            <input 
              required
              type="text" 
              value={formData.apellido} 
              onChange={e => setFormData({...formData, apellido: e.target.value})} 
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input 
              required
              type="email" 
              value={formData.email} 
              onChange={e => setFormData({...formData, email: e.target.value})} 
            />
          </div>
          <div className="form-group">
            <label>Fecha de Nacimiento</label>
            <input 
              required
              type="date" 
              value={formData.fecha_nacimiento ? formData.fecha_nacimiento.split('T')[0] : ''} 
              onChange={e => setFormData({...formData, fecha_nacimiento: e.target.value})} 
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
            <button type="button" onClick={() => setIsModalOpen(false)} className="btn-secondary">Cancelar</button>
            <button type="submit" className="btn-primary">
              {editingAlumno ? 'Actualizar' : 'Guardar'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AlumnosPage;
