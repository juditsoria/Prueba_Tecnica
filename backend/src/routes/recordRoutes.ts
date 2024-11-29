import { Request, Response, NextFunction, Router } from 'express';  // Importando correctamente Request y Response
import { body, validationResult } from 'express-validator';  // Importando express-validator
import { getAllRecords, getRecord, createNewRecord, deleteExistingRecord } from '../controllers/recordController';
import { authenticateToken } from '../middleware/authMiddleware';  // Importando el middleware de autenticación

const router = Router();

// Middleware para manejar errores de validación
const handleValidationErrors = (req: Request, res: Response, next: NextFunction): void | Response => {
  const errors = validationResult(req);  // Obtener los errores de la validación
  
  // Si hay errores, devolver una respuesta con un estado 400
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  // Si no hay errores, continuar al siguiente middleware
  next();
};
// Ruta para obtener todos los registros (protegida por el token)
router.get('/', authenticateToken, getAllRecords);

// Ruta para obtener un registro por ID (protegida por el token)
router.get('/:id', authenticateToken, getRecord);

// Ruta para crear un nuevo registro con validación y manejo de errores
router.post(
  '/',
  authenticateToken,  // Verificar token antes de las validaciones
  [
    // Validaciones del campo 'name'
    body('name')
      .notEmpty()
      .withMessage('El nombre es obligatorio')
      .isString()
      .withMessage('El nombre debe ser una cadena de texto')
      .isLength({ min: 3, max: 50 })
      .withMessage('El nombre debe tener entre 3 y 50 caracteres'),
  ],
  createNewRecord // Controlador para crear un nuevo registro
);


// Ruta para eliminar un registro por ID (protegida por el token)
router.delete('/:id', authenticateToken, deleteExistingRecord);

export default router;
