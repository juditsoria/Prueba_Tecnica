import mongoose from 'mongoose';

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/tu_base_de_datos')
  .then(() => {
    console.log('Conectado a MongoDB');
  })
  .catch((err) => {
    console.error('Error al conectar con MongoDB', err);
    process.exit(1); // Si la conexión falla, detener el servidor
  });
