import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [data, setData] = useState<any[]>([]); // Estado para los datos de los registros
  const [loading, setLoading] = useState<boolean>(true); // Estado de carga
  const [error, setError] = useState<string | null>(null); // Estado de error
  const [searchTerm, setSearchTerm] = useState<string>(''); // Estado para el término de búsqueda
  const [originalData, setOriginalData] = useState<any[]>([]); // Estado para los datos originales

  useEffect(() => {
    fetch('http://localhost:3000/api/records') // Usamos el proxy configurado en vite.config.js
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al cargar los registros');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Datos recibidos:', data); // Verifica la estructura de los datos
        if (data && Array.isArray(data.records)) {
          setData(data.records); // Ajusta según la estructura de tu respuesta
          setOriginalData(data.records);
        } else {
          setError('No se encontraron registros');
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error en la solicitud:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // Asegúrate de que 'data' sea un arreglo antes de intentar filtrar
  const filteredData = Array.isArray(data)
    ? data.filter((record) =>
        record.name?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : []; // Si 'data' no es un arreglo, retorna un arreglo vacío

  const deleteRecord = (id: number) => {
    const newData = data.filter((record) => record.id !== id);
    setData(newData);
    localStorage.setItem('data', JSON.stringify(newData));
  };

  const restoreData = () => {
    setData(originalData);
    localStorage.setItem('data', JSON.stringify(originalData));
  };

  const createRecord = (name: string) => {
    const newRecord = { id: Date.now(), name };
    const newData = [...data, newRecord];
    setData(newData);
    localStorage.setItem('data', JSON.stringify(newData));
  };

  if (loading) return <p>Cargando registros...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  return (
    <div className="container">
      <h1>Records from Backend</h1>
      <input
        type="text"
        placeholder="Buscar por nombre"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 mb-4"
      />
      <button onClick={restoreData} className="btn btn-primary mb-4">
        Restaurar Datos
      </button>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const form = e.target as HTMLFormElement;
          const input = form.querySelector('input[name="name"]') as HTMLInputElement;
          const newName = input.value;
          createRecord(newName);
          form.reset();
        }}
        className="mb-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Nuevo registro"
          className="border p-2 mr-2"
        />
        <button type="submit" className="btn btn-success">
          Agregar Registro
        </button>
      </form>
      <ul>
        {filteredData.map((record) => (
          <li key={record.id}>
            {record.name}
            <Link to={`/record/${record.id}`}>
              <button className="btn btn-info ml-2">Ver Detalles</button>
            </Link>
            <button
              onClick={() => deleteRecord(record.id)}
              className="btn btn-danger ml-2"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
