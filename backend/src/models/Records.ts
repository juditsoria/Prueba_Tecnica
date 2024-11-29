import mongoose, { Document, Schema } from 'mongoose';

interface IRecord extends Document {
  name: string;
  description: string;
}

const recordSchema = new Schema<IRecord>({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

const Record = mongoose.model<IRecord>('Record', recordSchema);

export { Record };
