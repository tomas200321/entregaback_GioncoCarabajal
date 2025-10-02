import express from 'express';
import { engine } from 'express-handlebars';
import mongoose from 'mongoose';
import { createServer } from 'http';
import { Server as IOServer } from 'socket.io';
import methodOverride from 'method-override';
import path from 'path';
import { fileURLToPath } from 'url';

import rutasProductos from './rutas/productos.ruta.js';
import rutasCarritos from './rutas/carritos.ruta.js';
import rutasVistas from './rutas/vistas.ruta.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app);
const io = new IOServer(httpServer);

// Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'vistas'));

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// anexar io para emitir desde rutas si hace falta
app.set('io', io);

// rutas (exponemos en español e inglés para compatibilidad)
app.use('/api/productos', rutasProductos);
app.use('/api/products', rutasProductos);
app.use('/api/carritos', rutasCarritos);
app.use('/api/carts', rutasCarritos);
app.use('/', rutasVistas);

// Websockets: sincronizan productos en /realtimeproducts
import { Producto } from './models/Producto.js';
io.on('connection', async (socket) => {
  console.log('Cliente websocket conectado', socket.id);
  const productos = await Producto.find().lean();
  socket.emit('productsUpdated', productos);

  socket.on('newProduct', async (data) => {
    try {
      const p = new Producto(data);
      await p.save();
      const all = await Producto.find().lean();
      io.emit('productsUpdated', all);
    } catch (err) {
      socket.emit('errorMessage', err.message);
    }
  });

  socket.on('deleteProduct', async (pid) => {
    try {
      await Producto.findByIdAndDelete(pid);
      const all = await Producto.find().lean();
      io.emit('productsUpdated', all);
    } catch (err) {
      socket.emit('errorMessage', err.message);
    }
  });
});

// Conexión a MongoDB
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/preentrega_unificado';
mongoose.connect(MONGO_URI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error conectar MongoDB', err));

const PORT = process.env.PORT || 8080;
httpServer.listen(PORT, () => console.log(`Servidor escuchando en http://localhost:${PORT}`));
