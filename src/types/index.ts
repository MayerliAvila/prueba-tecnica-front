export interface Alumno {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  fecha_nacimiento: string;
}

export interface Materia {
  id: number;
  nombre: string;
  codigo: string;
  credito: number;
}

export interface Nota {
  id: number;
  valor: number;
  idAlumno: number;
  idMateria: number;
}

export interface NotaInput {
  valor: number;
  idAlumno: number;
  idMateria: number;
}