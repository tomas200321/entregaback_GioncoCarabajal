# Proyecto Preentrega 2 (Servidor con Websockets y Handlebars)

Este proyecto implementa un servidor en **Node.js con Express**, que gestiona productos y carritos, utilizando persistencia en archivos JSON.  
Además, se agregó integración con **Handlebars** y **Socket.io** para mostrar productos en tiempo real.

## Funcionalidades

- CRUD de productos (/api/productos)
- Manejo de carritos (/api/carritos)
- Vista `inicio.handlebars` con lista de productos
- Vista `productosTiempoReal.handlebars` que se actualiza en vivo al agregar o eliminar productos mediante websockets

## Instalación

```bash
npm install
node src/servidor.js
```

Abrir en el navegador:
- [http://localhost:8080/](http://localhost:8080/) → Lista normal de productos
- [http://localhost:8080/productos-tiempo-real](http://localhost:8080/productos-tiempo-real) → Productos en tiempo real
