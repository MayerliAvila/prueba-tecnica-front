import api from './api';
import type { Nota, NotaInput } from '../types';

// Obtener notas por alumno
export const getNotasPorAlumno = async (idAlumno: number): Promise<Nota[]> => {
  const { data } = await api.get(`/notas/alumno/${idAlumno}`);
  return data;
};

// REGISTRAR NOTA
export const registrarNota = async (nota: NotaInput): Promise<Nota> => {
  const { data } = await api.post('/notas', nota);
  return data;
};