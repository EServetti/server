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

```

## Server.js (manejo de datos con URL)
Para uso de este archivo debemos instalar los paquetes necesarios en la terminal de la siguiente manera.
Primero creamos el package.json con:
```
npm init
```
Ahora instalamos el node_modules con los paquetes necesarios para que funcione la API.
```
npm install
```
Ahora ya podemos ver el servidor en el navegador yendo a la url http/localhost:8080/
### Peticiones GET
Para pedir que el navegador nos devuelva todos los productos debemos escribir la siguiente URL: 

http/localhost:8080/api/products.

Tambien podemos hacer que filtre a los productos segun su category con 

http/localhost:8080/api/products?query=(category)

Si lo que queremos es pedir un producto especifico podemos hacerlo de esta manera:

http/localhost:8080/api/products/:(id del producto)