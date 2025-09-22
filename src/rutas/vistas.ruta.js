import { Router } from 'express';
import { gestorProductos } from '../gestores/GestorProductos.js';

const router = Router();

// Vista principal con productos
router.get('/', (req, res) => {
    const productos = gestorProductos.obtenerProductos();
    res.render('inicio', { productos });
});

// Vista de productos en tiempo real
router.get('/productos-tiempo-real', (req, res) => {
    res.render('productosTiempoReal');
});

export default router;
