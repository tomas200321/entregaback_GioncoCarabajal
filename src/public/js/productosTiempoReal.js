const socket = io();
const lista = document.getElementById('listaProductos');
const form = document.getElementById('formProducto');

socket.on('productosActualizados', (productos) => {
    lista.innerHTML = '';
    productos.forEach(p => {
        const li = document.createElement('li');
        li.textContent = `${p.title} - $${p.price}`;
        lista.appendChild(li);
    });
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const titulo = document.getElementById('titulo').value;
    const descripcion = document.getElementById('descripcion').value;
    const precio = parseFloat(document.getElementById('precio').value);

    socket.emit('nuevoProducto', { title: titulo, description: descripcion, price: precio });

    form.reset();
});
