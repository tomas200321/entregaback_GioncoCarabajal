import fs from 'fs';

class GestorCarritos {
    constructor(rutaArchivo) {
        this.rutaArchivo = rutaArchivo;
        this.carritos = this.cargarCarritos();
    }

    cargarCarritos() {
        try {
            if (fs.existsSync(this.rutaArchivo)) {
                const data = fs.readFileSync(this.rutaArchivo, 'utf-8');
                return JSON.parse(data);
            } else {
                return [];
            }
        } catch (error) {
            console.error('Error al cargar carritos:', error);
            return [];
        }
    }

    guardarCarritos() {
        fs.writeFileSync(this.rutaArchivo, JSON.stringify(this.carritos, null, 2));
    }

    crearCarrito() {
        const nuevoCarrito = {
            id: this.carritos.length + 1,
            productos: []
        };
        this.carritos.push(nuevoCarrito);
        this.guardarCarritos();
        return nuevoCarrito;
    }

    obtenerCarritoPorId(id) {
        return this.carritos.find(c => c.id === id);
    }

    agregarProductoAlCarrito(cid, pid) {
        const carrito = this.obtenerCarritoPorId(cid);
        if (!carrito) return null;

        const productoExistente = carrito.productos.find(p => p.producto === pid);
        if (productoExistente) {
            productoExistente.cantidad++;
        } else {
            carrito.productos.push({ producto: pid, cantidad: 1 });
        }
        this.guardarCarritos();
        return carrito;
    }
}

export const gestorCarritos = new GestorCarritos('./src/data/carritos.json');
export default GestorCarritos;
