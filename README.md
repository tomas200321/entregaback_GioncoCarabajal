# Proyecto Unificado - Segunda entrega + Final

Este repositorio contiene la versión unificada del proyecto: incluye lo desarrollado en la segunda entrega (vistas Handlebars y WebSockets) y las mejoras de la entrega final (persistencia en MongoDB, paginación, filtros, endpoints de carrito avanzados).

## Estructura principal
- `src/` - código fuente
  - `models/` - modelos mongoose (Producto, Carrito)
  - `servicios/` - lógica de persistencia (productos, carritos)
  - `rutas/` - routers para API y vistas
  - `vistas/` - plantillas Handlebars
  - `public/` - assets públicos (CSS, JS)
- `CS2-SkinShop.postman_collection.json` - colección Postman con endpoints clave

## Requisitos
- Node v16+
- MongoDB (local o Atlas). Usar variable de entorno `MONGO_URI` para conectar a otro host.

## Instalar y ejecutar
```bash
npm install
# configurar MONGO_URI si es necesario, por ejemplo:
# export MONGO_URI="mongodb://127.0.0.1:27017/preentrega_unificado"
npm run dev
# o
npm start
```

## Endpoints clave
- `GET /api/products?limit=&page=&sort=&query=` (también disponible en `/api/productos`)
- `GET /api/products/:pid`
- `POST /api/products`
- `PUT /api/products/:pid`
- `DELETE /api/products/:pid`

Carritos (también disponibles en español `/api/carritos`):
- `POST /api/carts` -> crear carrito
- `GET /api/carts/:cid` -> obtener carrito (con productos poblados)
- `POST /api/carts/:cid/products/:pid` -> agregar producto (incrementa cantidad)
- `DELETE /api/carts/:cid/products/:pid` -> eliminar producto del carrito
- `PUT /api/carts/:cid` -> reemplazar todo el arreglo de productos
- `PUT /api/carts/:cid/products/:pid` -> actualizar solo la cantidad
- `DELETE /api/carts/:cid` -> vaciar carrito

## Vistas
- `/products` - listado paginado con botones para agregar al carrito
- `/products/:pid` - detalle del producto y botón para agregar
- `/carts/:cid` - vista del carrito con productos poblados
- `/realtimeproducts` - vista en tiempo real con Socket.IO (crear/eliminar con sockets)

## Postman
Importar `CS2-SkinShop.postman_collection.json` desde la raíz del repositorio.

## Notas
- El proyecto existe en una sola estructura coherente; se exponen tanto rutas en español como en inglés para facilitar pruebas.
- Se intentó mantener la lógica de negocio original y simplemente migrar la persistencia a MongoDB.
