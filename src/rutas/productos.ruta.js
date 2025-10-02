import { Router } from 'express';
import { listarProductos, crearProducto, obtenerProductoPorId, actualizarProducto, eliminarProducto } from '../servicios/productos.servicio.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, query } = req.query;
    const resultado = await listarProductos({ limit, page, sort, query });
    res.json(resultado);
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'Error al listar productos', error: err.message });
  }
});

router.get('/:pid', async (req, res) => {
  try {
    const producto = await obtenerProductoPorId(req.params.pid);
    if (!producto) return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
    res.json({ status: 'success', payload: producto });
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'Error interno', error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const creado = await crearProducto(req.body);
    res.status(201).json({ status: 'success', payload: creado });
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'Error al crear producto', error: err.message });
  }
});

router.put('/:pid', async (req, res) => {
  try {
    const actualizado = await actualizarProducto(req.params.pid, req.body);
    if (!actualizado) return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
    res.json({ status: 'success', payload: actualizado });
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'Error al actualizar', error: err.message });
  }
});

router.delete('/:pid', async (req, res) => {
  try {
    const eliminado = await eliminarProducto(req.params.pid);
    if (!eliminado) return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
    res.json({ status: 'success', message: 'Producto eliminado' });
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'Error al eliminar', error: err.message });
  }
});

export default router;
