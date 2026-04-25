import { useEffect, useState } from 'react';
import type { Materia } from '../types';
import * as materiasService from '../services/materiasService';
import Modal from '../components/Modal';
import { Plus, Edit2, Trash2 } from 'lucide-react';

const MateriasPage = () => {
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMateria, setEditingMateria] = useState<Materia | null>(null);
  
  const [formData, setFormData] = useState({ nombre: '', codigo: '', credito: 0 });

  const loadMaterias = async () => {
    try {
      const data = await materiasService.getMaterias();
      setMaterias(data);
    } catch (error) {
      console.error('Failed to load materias:', error);
    }
  };

  useEffect(() => {
    loadMaterias();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingMateria) {
        await materiasService.updateMateria(editingMateria.id, formData);
      } else {
        await materiasService.createMateria(formData);
      }
      setIsModalOpen(false);
      setEditingMateria(null);
      setFormData({ nombre: '', codigo: '', credito: 0 });
      loadMaterias();
    } catch (error) {
      console.error('Failed to save materia:', error);
      alert('Error guardando materia.');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de eliminar esta materia?')) {
      try {
        await materiasService.deleteMateria(id);
        loadMaterias();
      } catch (error) {
        console.error('Failed to delete materia:', error);
      }
    }
  };

  const openEditModal = (materia: Materia) => {
    setEditingMateria(materia);
    setFormData({ nombre: materia.nombre, codigo: materia.codigo, credito: materia.credito });
    setIsModalOpen(true);
  };

  const openCreateModal = () => {
    setEditingMateria(null);
    setFormData({ nombre: '', codigo: '', credito: 0 });
    setIsModalOpen(true);
  };

  return (
    <div className="animate-slide-up" style={{ width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ margin: 0 }}>Gestión de Materias</h1>
        <button className="btn-primary" onClick={openCreateModal} style={{ background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', boxShadow: '0 4px 15px rgba(16, 185, 129, 0.4)' }}>
          <Plus size={18} /> Nueva Materia
        </button>
      </div>

      <div className="glass-panel premium-table-container">
        <table className="premium-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Código</th>
              <th>Nombre</th>
              <th>Créditos</th>
              <th style={{ textAlign: 'right' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {materias.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: '3rem' }}>No hay materias registradas.</td>
              </tr>
            ) : materias.map(materia => (
              <tr key={materia.id}>
                <td><span className="badge badge-success">#{materia.id}</span></td>
                <td><span style={{ fontFamily: 'monospace', letterSpacing: '1px', color: '#94A3B8' }}>{materia.codigo}</span></td>
                <td style={{ fontWeight: 500, color: '#fff' }}>{materia.nombre}</td>
                <td>{materia.credito}</td>
                <td style={{ textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: '0.25rem', justifyContent: 'flex-end' }}>
                    <button className="btn-icon" onClick={() => openEditModal(materia)}>
                      <Edit2 size={18} color="#10B981" />
                    </button>
                    <button className="btn-icon" onClick={() => handleDelete(materia.id)}>
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
        title={editingMateria ? 'Editar Materia' : 'Nueva Materia'}
      >
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Código de la Materia</label>
            <input 
              required
              type="text" 
              value={formData.codigo} 
              onChange={e => setFormData({...formData, codigo: e.target.value})} 
            />
          </div>
          <div className="form-group">
            <label>Nombre de la Materia</label>
            <input 
              required
              type="text" 
              value={formData.nombre} 
              onChange={e => setFormData({...formData, nombre: e.target.value})} 
            />
          </div>
          <div className="form-group">
            <label>Créditos</label>
            <input 
              required
              type="number" 
              min="1"
              value={formData.credito} 
              onChange={e => setFormData({...formData, credito: parseInt(e.target.value, 10) || 0})} 
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
            <button type="button" onClick={() => setIsModalOpen(false)} className="btn-secondary">Cancelar</button>
            <button type="submit" className="btn-primary" style={{ background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)' }}>
              {editingMateria ? 'Actualizar' : 'Guardar'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default MateriasPage;
