// src/types/express.d.ts
import { User } from './models/user';  // Ajusta la importación a tu modelo de usuario si es necesario

declare global {
  namespace Express {
    interface Request {
      user?: User;  // Agrega el tipo de usuario aquí
    }
  }
}

declare namespace Express {
    export interface Request {
      user?: { userId: string }; // Define el tipo de la propiedad `user`
    }
  }
  