import api from './api';
import type { Alumno } from '../types';

export const getAlumnos = async (): Promise<Alumno[]> => {
  const { data } = await api.get('/alumnos');
  return data;
};

export const getAlumno = async (id: number): Promise<Alumno> => {
  const { data } = await api.get(`/alumnos/${id}`);
  return data;
};

export const createAlumno = async (alumno: Omit<Alumno, 'id'>): Promise<Alumno> => {
  const { data } = await api.post('/alumnos', alumno);
  return data;
};

export const updateAlumno = async (id: number, alumno: Omit<Alumno, 'id'>): Promise<Alumno> => {
  const { data } = await api.put(`/alumnos/${id}`, alumno);
  return data;
};

export const deleteAlumno = async (id: number): Promise<void> => {
  await api.delete(`/alumnos/${id}`);
};
