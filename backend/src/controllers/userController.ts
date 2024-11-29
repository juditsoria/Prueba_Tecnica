import { Request, Response } from 'express';
import User from '../models/user';  // Asegúrate de que la ruta al modelo sea correcta
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const createToken = (userId: string) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '1h' });
};

// Controlador para login
export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const token = createToken(user._id.toString());
      return res.status(200).json({ token });
    } else {
      return res.status(400).json({ message: 'Credenciales incorrectas' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Controlador para registro
export const registerUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: 'El usuario ya está registrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({
      username,
      password: hashedPassword,
    });

    await user.save();
    const token = createToken(user._id.toString());
    return res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};
