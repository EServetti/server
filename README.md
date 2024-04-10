## ProductManager
Creado por Emilio Servetti.
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

## Manejo de peticiones CRUD
Lo primero debe ser instalar postman, una ves que lo tengamos, ponemos a funcionar el servidor a traves de la consola con: 
```
npm start
```
Ahora em postman podremos usar las diferentes solicitudes CRUD:
### GET (ver todos los productos)
Si queremos obtener toddos los productos debemos asegurarnos que en la parte superior izquierda de postman diga GET, luego en la barra de texto ingresamos la siguiente url:
```
http/:localhost:8080/api/products
```
con esto ya conseguiremos que nuestro servidor nos devuelva todos los productos, tambien podemos hacer que devuelva los productos de una categoria especifica agregando una query:
```
http/:localhost:8080/api/products/?category="Ingresamos la categoria"
```
### GET (ver un producto especifico)
Para esto tambien usando el metodo GET tenemos que usar esta url:
```
http/:localhost:8080/api/products/:nid
```
abajo nos aparecera un cuadro que a su izquierda dice key (aqui se completara automaticamente con el nid), a su derecha hay otro cuadro vacio donde debemos ingresar el id del productos que queremos que devuelva, asi devolvera este producto.
### POST (crear un producto)
Ahora arriba a la izquierda debe decir POST, usaremos esta url:
```
http/:localhost:8080/api/products
```
pero ahora debajo seleccionamos la opcion body y luego raw, aparecera un cuadro donde debemos poner el objeto con las especificaciones aca un ejemplo:
```
{
  "title": "cortina",
  "photo": "https://example.com/cortina.png",
  "category": "hogar",
  "price": 200,
  "stock": 30
}
```
de esta manera crearemos un producto.
### PUT (actualizar un producto)
Ahora arriba cambiamos a PUT usamos esa url:
```
http/:localhost:8080/api/products/:nid
```
como cuando queriamos obtener un producto, agregamos el id al lado de key y luego vamos a donde fuimos para crear un producto, y le damos el nuevo formato, por ejemplo modificando el producto que creanis anteriormente:
```
{
  "title": "cortina",
  "photo": "https://example.com/cortina.png",
  "category": "baño",
  "price": 204,
  "stock": 20
}
```
de esta forma se actualizara el producto.
### DELETE (eliminar un producto)
Por ultimo arriba ponemos DELETE y como cuando leimos un producto:
```
http/:localhost:8080/api/products/:nid
```
y en el cuadro vacio al lado de la key agregamos el id del producto que queremos eliminar, de esta forma se eliminara.