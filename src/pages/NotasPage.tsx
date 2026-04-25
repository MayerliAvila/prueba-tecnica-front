import { useEffect, useState } from 'react';
import type { Nota, Alumno, Materia } from '../types';
import * as notasService from '../services/notasService';
import * as alumnosService from '../services/alumnosService';
import * as materiasService from '../services/materiasService';

const NotasPage = () => {
  const [alumnos, setAlumnos] = useState<Alumno[]>([]);
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState<number | null>(null);
  const [notas, setNotas] = useState<Nota[]>([]);
  const [loading, setLoading] = useState(false);

  // FORM REGISTRO
  const [idAlumnoForm, setIdAlumnoForm] = useState<number | null>(null);
  const [idMateriaForm, setIdMateriaForm] = useState<number | null>(null);
  const [valor, setValor] = useState('');

  // Cargar alumnos
  useEffect(() => {
    const fetchAlumnos = async () => {
      try {
        const data = await alumnosService.getAlumnos();
        setAlumnos(data);
      } catch (error) {
        console.error('Error al cargar alumnos ❌', error);
      }
    };
    fetchAlumnos();
  }, []);

  // Cargar materias
  useEffect(() => {
    const fetchMaterias = async () => {
      try {
        const data = await materiasService.getMaterias();
        setMaterias(data);
      } catch (error) {
        console.error('Error al cargar materias ❌', error);
      }
    };
    fetchMaterias();
  }, []);

  // Cargar notas por alumno
  useEffect(() => {
    if (alumnoSeleccionado !== null) {
      const fetchNotas = async () => {
        try {
          setLoading(true);
          const data = await notasService.getNotasPorAlumno(alumnoSeleccionado);
          setNotas(data);
        } catch (error) {
          console.error('Error al cargar notas ❌', error);
        } finally {
          setLoading(false);
        }
      };
      fetchNotas();
    } else {
      setNotas([]);
    }
  }, [alumnoSeleccionado]);

  // Nombre materia
  const getNombreMateria = (idMateria: number) => {
    const materia = materias.find((m) => m.id === idMateria);
    return materia ? materia.nombre : 'Sin materia';
  };

  // REGISTRAR NOTA
  const handleRegistrarNota = async () => {
    if (!idAlumnoForm || !idMateriaForm || !valor) {
      alert('Completa todos los campos');
      return;
    }

    try {
      await notasService.registrarNota({
        idAlumno: idAlumnoForm,
        idMateria: idMateriaForm,
        valor: Number(valor),
      });

      alert('Nota registrada ✅');

      if (alumnoSeleccionado === idAlumnoForm) {
        const data = await notasService.getNotasPorAlumno(idAlumnoForm);
        setNotas(data);
      }

      setValor('');
      setIdMateriaForm(null);

    } catch (error) {
      console.error('Error al registrar nota ❌', error);
    }
  };

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        📘 Notas por Alumno
      </h1>

      {/* REGISTRAR NOTA */}
      <div className="mb-8 border p-5 rounded">

        <h2 className="text-lg font-bold mb-4">
          ➕ Registrar Nota
        </h2>

        {/* Alumno */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Alumno</label>
          <select
            className="border p-2 rounded w-full"
            onChange={(e) => setIdAlumnoForm(Number(e.target.value))}
          >
            <option value="">Seleccionar alumno</option>
            {alumnos.map((a) => (
              <option key={a.id} value={a.id}>
                {a.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Materia */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Materia</label>
          <select
            className="border p-2 rounded w-full"
            onChange={(e) => setIdMateriaForm(Number(e.target.value))}
          >
            <option value="">Seleccionar materia</option>
            {materias.map((m) => (
              <option key={m.id} value={m.id}>
                {m.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Nota */}
        <div className="mb-5">
          <label className="block mb-2 font-semibold">Nota</label>
          <input
            type="number"
            placeholder="Ej: 4.5"
            className="border p-2 rounded w-full"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
          />
        </div>

        <button
          onClick={handleRegistrarNota}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Guardar Nota
        </button>
      </div>

      {/* BUSCAR NOTAS */}
      <div className="mb-6">

        <h2 className="text-lg font-bold mb-3">
          🔍 Buscar Notas por Alumno
        </h2>

        <select
          className="border p-2 rounded w-full"
          value={alumnoSeleccionado ?? ''}
          onChange={(e) =>
            setAlumnoSeleccionado(
              e.target.value ? Number(e.target.value) : null
            )
          }
        >
          <option value="">-- Selecciona un alumno --</option>
          {alumnos.map((alumno) => (
            <option key={alumno.id} value={alumno.id}>
              {alumno.nombre}
            </option>
          ))}
        </select>
      </div>

      {/* Loading */}
      {loading && <p>Cargando notas...</p>}

      {/* Tabla */}
      {!loading && notas.length > 0 && (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Materia</th>
              <th className="p-2 border">Nota</th>
            </tr>
          </thead>

          <tbody>
            {notas.map(({ id, valor, idMateria }) => (
              <tr key={id}>
                <td className="p-2 border">
                  {getNombreMateria(idMateria)}
                </td>
                <td className="p-2 border">{valor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Sin notas */}
      {!loading && alumnoSeleccionado && notas.length === 0 && (
        <p className="text-gray-500">
          Este alumno no tiene notas registradas.
        </p>
      )}
    </div>
  );
};

export default NotasPage;