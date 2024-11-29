import mongoose, { Document, Schema, Types } from 'mongoose';

// Modificar la interfaz para que el _id sea un ObjectId de Mongoose
interface IUser extends Document {
  _id: Types.ObjectId;  // Asegúrate de que _id sea de tipo ObjectId
  username: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

// Definir el modelo User
const User = mongoose.model<IUser>('User', userSchema);

export default User;
