import { Router } from 'express';
import { getAllRecords, getRecord, createNewRecord, deleteExistingRecord } from '../controllers/recordController'; // Importas los controladores

const router = Router();

// Definir las rutas y asociarlas a los controladores
router.get('/', getAllRecords); // Obtener todos los registros
router.get('/:id', getRecord);  // Obtener un registro por ID
router.post('/', createNewRecord); // Crear un nuevo registro
router.delete('/:id', deleteExistingRecord); // Eliminar un registro por ID

export default router;
