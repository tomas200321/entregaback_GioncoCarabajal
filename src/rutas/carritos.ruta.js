import { Router } from 'express';
import { crearCarrito, obtenerCarritoPorId, agregarProductoAlCarrito, eliminarProductoDelCarrito, reemplazarProductosCarrito, actualizarCantidadProducto, vaciarCarrito } from '../servicios/carritos.servicio.js';

const router = Router();

router.post('/', async (req, res) => {
  const carrito = await crearCarrito();
  res.status(201).json({ status: 'success', payload: carrito });
});

router.get('/:cid', async (req, res) => {
  const carrito = await obtenerCarritoPorId(req.params.cid);
  if (!carrito) return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
  res.json({ status: 'success', payload: carrito });
});

router.post('/:cid/productos/:pid', async (req, res) => {
  const actualizado = await agregarProductoAlCarrito(req.params.cid, req.params.pid);
  if (!actualizado) return res.status(404).json({ status: 'error', message: 'Carrito o producto no encontrado' });
  res.json({ status: 'success', payload: actualizado });
});

router.delete('/:cid/products/:pid', async (req, res) => {
  const resultado = await eliminarProductoDelCarrito(req.params.cid, req.params.pid);
  if (!resultado) return res.status(404).json({ status: 'error', message: 'Carrito o producto no encontrado' });
  res.json({ status: 'success', message: 'Producto eliminado del carrito' });
});

router.put('/:cid', async (req, res) => {
  const nuevoArray = req.body;
  const actualizado = await reemplazarProductosCarrito(req.params.cid, nuevoArray);
  if (!actualizado) return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
  res.json({ status: 'success', payload: actualizado });
});

router.put('/:cid/products/:pid', async (req, res) => {
  const { cantidad } = req.body;
  const actualizado = await actualizarCantidadProducto(req.params.cid, req.params.pid, cantidad);
  if (!actualizado) return res.status(404).json({ status: 'error', message: 'Carrito o producto no encontrado' });
  res.json({ status: 'success', payload: actualizado });
});

router.delete('/:cid', async (req, res) => {
  const vaciado = await vaciarCarrito(req.params.cid);
  if (!vaciado) return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
  res.json({ status: 'success', message: 'Carrito vaciado' });
});

export default router;
