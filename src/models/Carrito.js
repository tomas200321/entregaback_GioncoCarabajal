import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const carritoProductoSchema = new Schema({
  producto: { type: Schema.Types.ObjectId, ref: 'Producto', required: true },
  cantidad: { type: Number, default: 1 }
}, { _id: false });

const carritoSchema = new Schema({
  productos: { type: [carritoProductoSchema], default: [] }
}, { timestamps: true });

export const Carrito = model('Carrito', carritoSchema);
export default Carrito;
