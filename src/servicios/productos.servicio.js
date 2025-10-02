import { Producto } from '../models/Producto.js';

export const listarProductos = async ({ limit = 10, page = 1, sort, query } = {}) => {
  const filtro = {};
  if (query) {
    const [key, val] = query.includes(':') ? query.split(':') : ['category', query];
    if (key === 'category') filtro.category = val;
    else if (key === 'status') {
      if (val === 'available') filtro.status = true;
      else if (val === 'not') filtro.status = false;
    }
  }

  const limitN = Number(limit) || 10;
  const pageN = Number(page) || 1;
  const sortOption = {};
  if (sort === 'asc') sortOption.price = 1;
  else if (sort === 'desc') sortOption.price = -1;

  const totalDocs = await Producto.countDocuments(filtro);
  const totalPages = Math.max(1, Math.ceil(totalDocs / limitN));
  const currentPage = Math.min(Math.max(1, pageN), totalPages);
  const skip = (currentPage - 1) * limitN;
  const docs = await Producto.find(filtro).sort(sortOption).skip(skip).limit(limitN).lean();

  return {
    status: 'success',
    payload: docs,
    totalPages,
    prevPage: currentPage > 1 ? currentPage - 1 : null,
    nextPage: currentPage < totalPages ? currentPage + 1 : null,
    page: currentPage,
    hasPrevPage: currentPage > 1,
    hasNextPage: currentPage < totalPages,
    prevLink: currentPage > 1 ? `/api/products?limit=${limitN}&page=${currentPage-1}${sort?('&sort='+sort):''}${query?('&query='+encodeURIComponent(query)):''}` : null,
    nextLink: currentPage < totalPages ? `/api/products?limit=${limitN}&page=${currentPage+1}${sort?('&sort='+sort):''}${query?('&query='+encodeURIComponent(query)):''}` : null
  };
};

export const crearProducto = async (datos) => {
  const producto = new Producto(datos);
  return await producto.save();
};

export const obtenerProductoPorId = async (id) => {
  return await Producto.findById(id).lean();
};

export const actualizarProducto = async (id, datos) => {
  return await Producto.findByIdAndUpdate(id, datos, { new: true }).lean();
};

export const eliminarProducto = async (id) => {
  return await Producto.findByIdAndDelete(id);
};
