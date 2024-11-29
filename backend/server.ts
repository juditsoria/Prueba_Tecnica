import express from 'express';
import recordsRouter from './src/routes/recordRoutes'; // Asegúrate de que las rutas están bien importadas

const app = express();

// Middleware para parsear el cuerpo de las solicitudes como JSON
app.use(express.json()); // Utilizamos el middleware de Express para manejar JSON directamente

// Usar las rutas
app.use('/api/records', recordsRouter); // Asegúrate de que las rutas estén prefijadas con "/api/records"

// Manejo de errores global
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Algo salió mal' });
});

// Puerto en el que se ejecuta el servidor
const PORT = 3000;
try {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
} catch (error) {
  console.error(`Error al iniciar el servidor: ${error}`);
}
