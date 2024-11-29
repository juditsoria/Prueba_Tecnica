import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../RecordDetail.css';  // Si el CSS está en la carpeta src



interface Record {
  id: number;
  name: string;
  // Agrega otros detalles que puedas tener
}

function RecordDetail() {
  const { id } = useParams(); // Obtener el 'id' del registro desde la URL
  const [record, setRecord] = useState<Record | null>(null); // Inicializamos como null
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Aquí asumo que tienes una API que devuelve los detalles de un registro por 'id'
    fetch(`http://localhost:3000/api/records/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setRecord(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Error al cargar el registro');
        setLoading(false);
      });
  }, [id]);

  // Si está cargando, mostramos un mensaje de espera
  if (loading) return <p>Cargando detalles...</p>;

  // Si ocurre un error, lo mostramos
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  // Si el registro no existe
  if (!record) return <p>No se encontró el registro.</p>;

  return (
    <div className="record-detail">
      <h1>Detalles del Registro</h1>
      <p><strong>Nombre:</strong> {record.name}</p>
      <p><strong>ID:</strong> {record.id}</p>
      {/* Muestra otros detalles si los tienes disponibles */}
    </div>
  );
}

export default RecordDetail;
 