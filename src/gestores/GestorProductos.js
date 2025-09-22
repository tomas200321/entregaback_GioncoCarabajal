import fs from 'fs';

class GestorProductos {
    constructor(rutaArchivo) {
        this.rutaArchivo = rutaArchivo;
        this.productos = this.cargarProductos();
    }

    cargarProductos() {
        try {
            if (fs.existsSync(this.rutaArchivo)) {
                const data = fs.readFileSync(this.rutaArchivo, 'utf-8');
                return JSON.parse(data);
            } else {
                return [];
            }
        } catch (error) {
            console.error('Error al cargar productos:', error);
            return [];
        }
    }

    guardarProductos() {
        fs.writeFileSync(this.rutaArchivo, JSON.stringify(this.productos, null, 2));
    }

    obtenerProductos() {
        return this.productos;
    }

    obtenerProductoPorId(id) {
        return this.productos.find(p => p.id === id);
    }

    agregarProducto(producto) {
        const nuevoProducto = {
            id: this.productos.length + 1,
            ...producto
        };
        this.productos.push(nuevoProducto);
        this.guardarProductos();
        return nuevoProducto;
    }

    actualizarProducto(id, datos) {
        const indice = this.productos.findIndex(p => p.id === id);
        if (indice !== -1) {
            this.productos[indice] = { ...this.productos[indice], ...datos, id };
            this.guardarProductos();
            return this.productos[indice];
        }
        return null;
    }

    eliminarProducto(id) {
        this.productos = this.productos.filter(p => p.id !== id);
        this.guardarProductos();
    }
}

export const gestorProductos = new GestorProductos('./src/data/productos.json');
export default GestorProductos;
