## ProductManager
Creado por Emilio Servetti, UserManager por Ignacio Vitello.
## Función
Programa para el manejo de productos que cuentan con varias caracteristicas especificadas mas abajo, capaz de crear, leer uno o todos los productos y eliminaro.
Los datos son guardados en la memoria o en un archivo json segun el archivo que se ejecute.
## Como usarlo
### ProductManager.js (guardado en memoria)
```
//invocar la clase
const producto = new ProductManager();

//metodo de creado
producto.create({
  title: "Nombre del producto",
  photo: "Dirección del producto",
  category: "Categoria",
  price: "Precio",
  stock: "Cantidad de stock",
});

//metodo para leer todos
console.log(producto.read());
//metodo para leer uno segun su id (en este caso 1)
console.log(producto.readOne(1));
//metodo para eliminar uno segun su id(en este caso 4)
producto.destroy(4);
```
### ProductManager.fs.gs (guardado en archivos)
```
//usarlo dentro de una funcion asincronica para evitar problemas
async function test() {
//invoco la clase
const productos = new ProductManager();
//metodo para crear un producto
await productos.create({
  title: "Nombre",
  photo: "Direccion de la clase",
  category: "Categoria",
  price: "Precio",
  stock: "Cantidad de stock",
});
//metodo para leer todos 
await productos.read();
//metodo para leer uno segun su id
await productos.readOne('b5b939f6321fcd6ba5c18786')
//metodo para eliminar uno segun su id
await productos.destroy(dd9039c9c43128e451aef8d3)