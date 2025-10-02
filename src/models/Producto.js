import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const productoSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  status: { type: Boolean, default: true },
  stock: { type: Number, required: true },
  category: { type: String, required: true },
  thumbnails: { type: [String], default: [] }
}, { timestamps: true });

export const Producto = model('Producto', productoSchema);
export default Producto;
