import { Carrito } from '../models/Carrito.js';
import { Producto } from '../models/Producto.js';

export const crearCarrito = async () => {
  const carrito = new Carrito({ productos: [] });
  return await carrito.save();
};

export const obtenerCarritoPorId = async (id) => {
  return await Carrito.findById(id).populate('productos.producto').lean();
};

export const agregarProductoAlCarrito = async (cid, pid) => {
  const carrito = await Carrito.findById(cid);
  if (!carrito) return null;
  const producto = await Producto.findById(pid);
  if (!producto) return null;
  const existente = carrito.productos.find(p => p.producto.toString() === pid.toString());
  if (existente) existente.cantidad += 1;
  else carrito.productos.push({ producto: pid, cantidad: 1 });
  await carrito.save();
  return await Carrito.findById(cid).populate('productos.producto').lean();
};

export const eliminarProductoDelCarrito = async (cid, pid) => {
  const carrito = await Carrito.findById(cid);
  if (!carrito) return null;
  carrito.productos = carrito.productos.filter(p => p.producto.toString() !== pid.toString());
  await carrito.save();
  return await Carrito.findById(cid).populate('productos.producto').lean();
};

export const reemplazarProductosCarrito = async (cid, nuevoArray) => {
  const carrito = await Carrito.findById(cid);
  if (!carrito) return null;
  carrito.productos = nuevoArray.map(item => ({ producto: item.producto, cantidad: item.cantidad }));
  await carrito.save();
  return await Carrito.findById(cid).populate('productos.producto').lean();
};

export const actualizarCantidadProducto = async (cid, pid, cantidad) => {
  const carrito = await Carrito.findById(cid);
  if (!carrito) return null;
  const item = carrito.productos.find(p => p.producto.toString() === pid.toString());
  if (!item) return null;
  item.cantidad = Number(cantidad);
  await carrito.save();
  return await Carrito.findById(cid).populate('productos.producto').lean();
};

export const vaciarCarrito = async (cid) => {
  const carrito = await Carrito.findById(cid);
  if (!carrito) return null;
  carrito.productos = [];
  await carrito.save();
  return carrito;
};
