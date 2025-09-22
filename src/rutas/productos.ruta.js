import { Router } from 'express';
import { gestorProductos } from '../gestores/GestorProductos.js';

const router = Router();

// Listar todos los productos
router.get('/', (req, res) => {
    res.json(gestorProductos.obtenerProductos());
});

// Obtener producto por ID
router.get('/:pid', (req, res) => {
    const producto = gestorProductos.obtenerProductoPorId(parseInt(req.params.pid));
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(producto);
});

// Agregar nuevo producto
router.post('/', (req, res) => {
    const producto = gestorProductos.agregarProducto(req.body);
    res.status(201).json(producto);
});

// Actualizar producto
router.put('/:pid', (req, res) => {
    const producto = gestorProductos.actualizarProducto(parseInt(req.params.pid), req.body);
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(producto);
});

// Eliminar producto
router.delete('/:pid', (req, res) => {
    gestorProductos.eliminarProducto(parseInt(req.params.pid));
    res.json({ mensaje: 'Producto eliminado correctamente' });
});

export default router;
