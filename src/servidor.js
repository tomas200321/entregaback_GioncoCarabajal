import express from 'express';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import { crearServidorHTTP } from 'http';
import rutaProductos from './rutas/productos.ruta.js';
import rutaCarritos from './rutas/carritos.ruta.js';
import rutaVistas from './rutas/vistas.ruta.js';
import { gestorProductos } from './gestores/GestorProductos.js';

const app = express();
const servidorHTTP = crearServidorHTTP(app);
const io = new Server(servidorHTTP);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./src/public'));

// Configuración de Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/vistas');

// Rutas API
app.use('/api/productos', rutaProductos);
app.use('/api/carritos', rutaCarritos);
app.use('/', rutaVistas);

// Websockets
io.on('connection', (socket) => {
    console.log('Cliente conectado por WebSocket');

    // Enviar productos iniciales
    socket.emit('productosActualizados', gestorProductos.obtenerProductos());

    // Escuchar creación de producto
    socket.on('nuevoProducto', (data) => {
        gestorProductos.agregarProducto(data);
        io.emit('productosActualizados', gestorProductos.obtenerProductos());
    });

    // Escuchar eliminación de producto
    socket.on('eliminarProducto', (id) => {
        gestorProductos.eliminarProducto(id);
        io.emit('productosActualizados', gestorProductos.obtenerProductos());
    });
});

// Iniciar servidor
const PUERTO = 8080;
servidorHTTP.listen(PUERTO, () => {
    console.log(`Servidor corriendo en http://localhost:${PUERTO}`);
});
