import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import recordRoutes from './routes/recordRoutes'; // Importas las rutas

const app = express();
const PORT = 3000;

app.use(cors({
  origin: 'http://localhost:5173',  // Asegúrate de poner aquí la URL de tu front-end
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
}));

app.use(bodyParser.json());
app.use('/api/records', recordRoutes); // Asocias las rutas a la aplicación

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
