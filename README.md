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
Una ves iniciado el servidor lo podemos visitar escribiendo localhost:8080 en nuestro buscador, esto nos llevara a la pagina proncial, aqui podremos ver todos los productos y en ellos tenemos un boton que nos lleva a  localhost:8080/products/:pid en donde podremos ver los datos del producto y tendremos el boton para agregar al carrito, arriba tendremos una barra de busqueda con las siguientes opciones: Home (donde estamos), Log In y Register, aqui como usarlos:
## Create a product
Importante! esta opcion aparecera solo si somos usuarios con role de tipo seller(1).
Esto nos llevara a una ventana con todos los productos ordenados desde el ultimo en ser creado hasta el primero, arriba de ellos tendremos un formulario, si ingresamos los datos que nos pide (de los cuales solo el title es obligatorio) crearemos un nuevo product y este aparecera en tiempo real.
## Register
Pagina para registrarse, donde se debe ingresar el email para nuestra cuenta, un nombre de usuario y la contraseña, si ya existe una cuenta con este correo saltara un cartel que señale el error, si nos registramos exitosamente, nos devolvera un cartel que nos avisa que se envio un correo al mail que hayamos utilizado para crear la cuenta, en este mail tendremos un boton para hacer la autenticacion, mientras la cuenta no se haya verificado con el mail NO sera posible el ingreso a la web con la misma.
## Log In 
Pagina para iniciar sesión, aqui debemos ingresar nuestro email y contraseña, en el caso de que uno de los dos este mal saldra un cartel que lo indique, si se inicia sesión correctamente, nos redirigira a la pagina pricipal habilitando en la barra de navegacion los botones de carrito, para crear un nuevo producto (solo si somos rol 1) y un boton con la imagen de nuestra cuenta que al presionarlo desplegara dos opciones: log out para cerrar sesión y Account para ver los detalles de nuestra cuenta. Una ves que la sesión expire (una hora despues de iniciada), al presionar uno de los botones que solo estan disponibles con la sesion iniciada, nos redirigira a la pagina principal para iniciar sesión nuevamente.
## Log In con Google
Tanto en el register como en el log in nos aparecera la opcion de continuar con google, no importa desde cual de estos lo presionemos ya que cumple la funcion de register y login al mismo tiempo.
## Account y Settings
Una ves que ingresamos a Account nos llevara a una pagina con los detalles de nuestra cuenta, ademas debajo de todo podemos presionar el boton settings que nos llevara a otra pagina donde podremos editar la foto de perfil de nuestra cuenta y el nombre de usuario, una ves cambiada la foto, se actualizara no solo en settings y en user data si no tambiem en el boton de la barra de navegación, ademas en la parte inferior tendremos la opcion de actualizar nuestro rol a seller para que nos aparezca la opcion de crear un producto en la barra de navegaciones.
## Cart
Si presionamos el logo de un carrito de compras arriba a la derecha,nos redirigira a la pagina del carrito, en el carrito veremos los productos que posee un usuario en el caso que tenga products en el carrito, en ellos tendremos las opciones de cambiar la cantidad que queremos y de eliminar ese producto del carrito,  ademas debajo tendremos el precio total de ese carrito que dependera de la cantidad de unidades que queramos de ese producto, tambien en la parte inferior tendremos la opcion de cancelar la compra (borrando todos los carritos de nuestro usuario) o la opcion de finalizar compra que nos llevara a una nueva para finalizar la compra. 
En el caso de que el usuario no tenga un product en el cart se mostrara un cartel invitandolo a comprar.
## Finish buy
Al seleccionar la opcion finish buy, nos llevara a una pagina donde tendremos todos nuestros carritos con su precio y el precio total, debajo aparecera un formulario para finalizar la compra (obviamente no funcional actualmente), en el mismo aparecera la imagen de la tarjeta de credito que seleccionemos y luego unos campos donde se deberian ingresar los datos.


