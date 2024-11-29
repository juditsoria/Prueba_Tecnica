import { Request, Response } from 'express';

// Devuelve todos los registros
export const getAllRecords = (req: Request, res: Response): void => {
  try {
    // Aquí simulas una base de datos con algunos registros de ejemplo
    const records = [
      { id: 1, name: 'Registro 1' },
      { id: 2, name: 'Registro 2' },
      { id: 3, name: 'Registro 3' },
    ];
    res.json({ records }); // Devuelves el arreglo de registros
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los registros' });
  }
};

// Devuelve un registro específico por su ID
export const getRecord = (req: Request, res: Response): void => {
  try {
    const recordId = req.params.id;
    const record = { id: recordId, name: `Registro ${recordId}` }; // Simulación de registro por ID
    res.json(record); // Devuelves el objeto del registro
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el registro' });
  }
};

// Crea un nuevo registro
export const createNewRecord = (req: Request, res: Response): void => {
  try {
    const { name, description } = req.body; // Recibes nombre y descripción
    // Aquí podrías guardar el nuevo registro en la base de datos
    const newRecord = { id: Date.now(), name, description }; // Simulación de la creación de un nuevo registro
    res.status(201).json({ message: `Registro creado: ${name}`, record: newRecord }); // Devuelves el nuevo registro creado
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el registro' });
  }
};

// Elimina un registro por su ID
export const deleteExistingRecord = (req: Request, res: Response): void => {
  try {
    const recordId = req.params.id;
    // Aquí podrías eliminar el registro de la base de datos
    res.json({ message: `Registro ${recordId} eliminado` }); // Mensaje de confirmación
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el registro' });
  }
};
