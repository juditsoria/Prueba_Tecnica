import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface JwtPayload {
  userId: string;
}

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // "Bearer <token>"

  if (!token) {
    // Enviar respuesta sin retornar
    res.status(401).json({ message: 'Token no proporcionado' });
    return; // Importante: Terminar la ejecución de la función para evitar el siguiente middleware
  }

  try {
    // Verifica el token utilizando la clave secreta
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    
    // Si el token es válido, agregamos la información del usuario al objeto req
    req.user = decoded;
    
    next();  // Llamamos a next() para continuar con el flujo del middleware
  } catch (error) {
    // Enviar respuesta sin retornar
    res.status(403).json({ message: 'Token inválido o expirado' });
    return; // Termina la ejecución si el token no es válido
  }
};
