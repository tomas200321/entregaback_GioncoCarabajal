import { Router } from 'express';
import { Producto } from '../models/Producto.js';
import { Carrito } from '../models/Carrito.js';

const router = Router();

// Vista principal con paginación - /products
router.get('/products', async (req, res) => {
  const { limit = 10, page = 1, sort, query } = req.query;
  const filtro = {};
  if (query) {
    const [key, val] = query.includes(':') ? query.split(':') : ['category', query];
    if (key === 'category') filtro.category = val;
    else if (key === 'status') {
      if (val === 'available') filtro.status = true;
      else if (val === 'not') filtro.status = false;
    }
  }
  const sortOption = {};
  if (sort === 'asc') sortOption.price = 1;
  else if (sort === 'desc') sortOption.price = -1;

  const limitN = Number(limit);
  const pageN = Number(page);
  const totalDocs = await Producto.countDocuments(filtro);
  const totalPages = Math.ceil(totalDocs / limitN) || 1;
  const currentPage = Math.min(Math.max(1, pageN), totalPages);
  const skip = (currentPage - 1) * limitN;
  const productos = await Producto.find(filtro).sort(sortOption).skip(skip).limit(limitN).lean();

  res.render('index', {
    productos,
    totalPages,
    page: currentPage,
    hasPrevPage: currentPage > 1,
    hasNextPage: currentPage < totalPages,
    prevPage: currentPage > 1 ? currentPage - 1 : null,
    nextPage: currentPage < totalPages ? currentPage + 1 : null,
    limit: limitN,
    sort,
    query
  });
});

router.get('/products/:pid', async (req, res) => {
  const producto = await Producto.findById(req.params.pid).lean();
  if (!producto) return res.status(404).send('Producto no encontrado');
  res.render('productoDetalle', { producto });
});

router.get('/carts/:cid', async (req, res) => {
  const carrito = await Carrito.findById(req.params.cid).populate('productos.producto').lean();
  if (!carrito) return res.status(404).send('Carrito no encontrado');
  res.render('carritoVista', { carrito });
});

// Realtime view (from second entrega)
router.get('/realtimeproducts', async (req, res) => {
  const productos = await Producto.find().lean();
  res.render('realTimeProducts', { productos });
});

export default router;
