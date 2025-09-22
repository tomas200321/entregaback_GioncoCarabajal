import { Router } from 'express';
import { gestorCarritos } from '../gestores/GestorCarritos.js';

const router = Router();

// Crear carrito
router.post('/', (req, res) => {
    const carrito = gestorCarritos.crearCarrito();
    res.status(201).json(carrito);
});

// Obtener carrito por ID
router.get('/:cid', (req, res) => {
    const carrito = gestorCarritos.obtenerCarritoPorId(parseInt(req.params.cid));
    if (!carrito) return res.status(404).json({ error: 'Carrito no encontrado' });
    res.json(carrito);
});

// Agregar producto al carrito
router.post('/:cid/producto/:pid', (req, res) => {
    const carrito = gestorCarritos.agregarProductoAlCarrito(parseInt(req.params.cid), parseInt(req.params.pid));
    if (!carrito) return res.status(404).json({ error: 'Carrito no encontrado' });
    res.json(carrito);
});

export default router;
