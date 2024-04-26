## ProductManager
Creado por Emilio Servetti.
## Función

Programa para el manejo de productos y usuarios que cuentan con varias caracteristicas especificadas mas abajo, capaz de crear, actualizar, eliminar o leer uno o todos los productos y usuarios.
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
### ProductManager.fs.js (guardado en archivos)
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
## Manejo de página con vistas
Ahora el manejo sera de manera mas simple y visual desde una pagina, para visitarla igual que con las anteriores formas de manejo debemos iniciar el server con:
```
npm start
```
Una ves iniciado el servidor lo podemos visitar escribiendo localhost:8080 en nuestro buscador, esto nos llevara a la pagina proncial, arriba tendremos una barra de busqueda con las siguientes opciones: Home (donde estamos), Our Products, Log In y Register, aqui como usarlos:
## Our Products
Esto nos llevara a una ventana con todos los productos ordenados desde el ultimo en ser creado hasta el primero, arriba de ellos tendremos un formulario, si ingresamos los datos que nos pide (de los cuales solo el title es obligatorio) crearemos un nuevo product y este aparecera en tiempo real.
## Log In 
Al entrar a esta ventana nos aparecera un campo de texto en el que deveremos ingresar el id del user que queramos ver (lo podemos encontrar en HOME), esto nos redireccionara a una ventana con los datos del usuario.
## Register
Aqui cree una maqueta de una pagina de registro guiandome de diferentes paginas vistas, en este aparecen las opciones de crear un usuario ingresando email, name y password, o ingresar con tu cuenta de Google o Apple.
y en el cuadro vacio al lado de la key agregamos el id del producto que queremos eliminar, de esta forma se eliminara.

