import api from './api';
import type { Materia } from '../types';

export const getMaterias = async (): Promise<Materia[]> => {
  const { data } = await api.get('/materias');
  return data;
};

// Even though the prompt didn't specify the singular, we include it based on standard REST assumptions
export const getMateria = async (id: number): Promise<Materia> => {
  const { data } = await api.get(`/materias/${id}`);
  return data;
};

export const createMateria = async (materia: Omit<Materia, 'id'>): Promise<Materia> => {
  const { data } = await api.post('/materias', materia);
  return data;
};

export const updateMateria = async (id: number, materia: Omit<Materia, 'id'>): Promise<Materia> => {
  const { data } = await api.put(`/materias/${id}`, materia);
  return data;
};

export const deleteMateria = async (id: number): Promise<void> => {
  await api.delete(`/materias/${id}`);
};
