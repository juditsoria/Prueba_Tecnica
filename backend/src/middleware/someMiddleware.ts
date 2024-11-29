import { Request, Response, NextFunction } from 'express';

const someMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user;  // Accede a la propiedad 'user' que agregamos al Request en el middleware de autenticación
  if (user) {
    console.log(user);  // Si el usuario existe, lo logueamos
  } else {
    console.log('No user found');  // Si no hay usuario, mostramos un mensaje
  }
  next();  // Pasamos al siguiente middleware o ruta
};

export default someMiddleware;
