# Everithing for your home
Creado por Emilio Servetti.
## Descripción
E-commerce sobre venta de muebles, electrodomésticos para el hogar, servidor creado con Node.js con Express y front-end creado con React

## Manejo de página con vistas
Para poner en funcionamiento el servidor local sera necesario clonar los repositorios del server: https://github.com/EServetti/server y del front: https://github.com/EServetti/server-front y seguir estos pasos:

Primero es necesario poner en funcionamiento el servidor con los siguientes comandos:
```
//desarrollo
npm run dev 
//testing
npm run test
//produccion
npm start
```
y el front de react con:
```
npm start
```

## Aclaracion!
Usando el server en un entorno local, este se vera privado de poner en funcionamiento algunas funciones como por ejemplo completar una compra o iniciar sesion con Google, si quieres usar todas las funciones visitar la url: https://everithingforyourhome.vercel.app (actualmente NO en funcionamiento).

## Usos

Una ves iniciado el servidor podra ser visitado en http://localhost:5173 esta es la pagina de inicio o HOME, aqui tenemos los productos en venta, un buscador para filtrar por nombre, la opcion de filtrar por categoría y la info de la pagina con sus respectivos botones para ir a la próxima o anterior pagina, en la navBar(Barra de tareas) encontraremos las opciones Home(actual), login para iniciar sesion y register para registrarnos, a continuacion mas info sobre la navBar.
## Register
Pagina para registrarse, donde se debe ingresar el email para nuestra cuenta, un nombre de usuario y la contraseña, si ya existe una cuenta con este correo no sera posible crearla, si nos registramos exitosamente, nos avisara con una alerta que se envio un correo al mail que hayamos utilizado para crear la cuenta, en este mail tendremos un boton para hacer la autenticacion, mientras la cuenta no se haya verificado con el mail NO sera posible el ingreso a la web con la misma.
## Log In 
Pagina para iniciar sesión, aqui debemos ingresar nuestro email y contraseña, si se inicia sesión correctamente, nos redirigira a la pagina pricipal habilitando en la barra de navegacion los botones de carrito, para crear un nuevo producto (solo si somos rol admin o premium ) y un boton con la imagen de nuestra cuenta que al presionarlo desplegara tres opciones: log out para cerrar sesión "My purchases" para ver las compras completas que tenemos y su estado (solo para user normales y premium ) y "My account" para ver los detalles de nuestra cuenta.
## Log In con Google
Tanto en el register como en el log in nos aparecera la opcion de continuar con google.
## Create a product
Importante! esta opcion aparecera solo si somos admins de la pagina (para probarlo iniciar sesión con email: servettiemilio@gmail.com, password: Emilio1011) o si somos usuarios premium (email: eservetti2018@gmail.com, password: Emilio1011).
Esto nos llevara a una ventana con todos los productos ordenados desde el ultimo en ser creado hasta el primero, arriba de ellos tendremos un formulario, si ingresamos los datos que nos pide crearemos un nuevo producto y este aparecera en tiempo real, ademas al lado del formulario aparecerá un modelo de producto en tiempo real con los datos que le vamos pasando.

## Account y Settings
Una ves que ingresamos a Account nos llevara a una pagina con los detalles de nuestra cuenta, en el caso de que la cuenta fue creada recientemente nos pedirá que la completemos, al seleccionar esta opcion nos llevará a un formulario en el que deberemos ingresar algunos datos para completar la cuenta (solo necesarios age y phone), en el caso de que la cuenta ya este completa nos apareceran los datos de la misma.
## Cart
Si presionamos el logo del carrito de compras arriba a la derecha,nos redirigira a la pagina del carrito, en el carrito veremos los productos que posee un usuario en el caso que tenga products en el carrito, en ellos tendremos las opciones de cambiar la cantidad que queremos y de eliminar ese producto del carrito,  ademas debajo tendremos el precio total de ese carrito que dependera de la cantidad de unidades que queramos de ese producto, tambien en la parte inferior tendremos la opcion de cancelar la compra (borrando todos los carritos de nuestro usuario) o la opcion de finalizar compra que nos llevara a una nueva para finalizar la compra. 
En el caso de que el usuario no tenga un product en el cart se mostrara un cartel invitandolo a comprar.
## Finish buy
Al seleccionar la opcion finish buy, nos llevara a una pagina donde tendremos todos nuestros carritos con su precio y el precio total, debajo aparecera un boton para pasar a finalizar la compra a traves de stripe (no funcional en entorno local).

## My purchases 
En my purchases (accesible en la barra desplegable) podremos ver nuestras compras completas, la fecha en que fueron completadas y el estado de las mismas que puede ser "paid" o "delivered", esta vista no sera accecible para usuarios admin ya que no pueden hacer compras.

## My products o Manage products (segun el role)
En esta opcion de la navBar podremos entrar a una vista donde podremos ver los productos creados por nuestro user en el caso de que seamos premium o todos los productos en el caso de que seamos admin, aqui podremos buscar el producto que necesitemos actualizar o eliminar con una barra de busqueda y hacer la actualizacion o eliminacion.

# Detalles
Algunos detalles a destacar de la api son:
* Al comprar un producto, no solo se actualizara el carrito de "reserved" a "paid" sino que tambien se eliminara la cantidad comprada del stock del product.
* Cuando un producto no tenga stock nos aparecera un cartel que lo diga y no sera posible agregarlo, ni tampoco completar una compra de este producto.
* No podremos agregar a un cart una cantidad de un producto mayor a su stock.

# Logger
Con la implementacion del logger cree 4 nuevos endpoints para poder probar facilmente los logs, todos ellos saldran de la url principal /api/logger.
## /error
Esto nos devuelve un error de status 400 con un mensaje "Logged error".
## /auth
Esto nos devuelve un error de status 401 con un mensaje "Bad auth!".
## /forbidden
Esto nos devuelve un error de status 403 con un mensaje "Forbidden from policies!".
## /notfound
Esto nos devuelve un error de status 404 con un mensaje "Not found docs!".

Entrando en estos endpoints podras ver como se consologuean todos los errores en la consola en el caso de que estemos en un ambiente de desarrollo, y en caso de un ambiente de producción ademas de consologuearse se guardaran en un archivo.

# Documentacion
En la ruta  http://localhost:8080/api/docs podremos ver la documentacion sobre las persistencias de la api y sus rutas, esta doumentación estara disponible solamente cuando la api este en desarrollo.

# Testing 
Tambien podremos testear el server de dos maneras:
## Test de stress
Este test sera con el modulo de artillery y un flujo con un archivo yaml en este flujo se testearan 4 operaciones (login, read all products, create a cart y logout) y esto se repetira durante 10 segundos con 50 repeticiones por segundo, de esta manera podremos testear que tan preparado esta nuestro server en caso de un uso masivo, este test se podra ejecutar teniendo en una consola el server en funcionamiento y en otra ejecutando el script:
```
npm run artillery-flow
```
## Test de endpoints
Tambien podremos testear todos los endpoints del server, probando como funciona la creación, actualización, leído y eliminación de cada una de las persistencias a traves de sus respectivos endpoints chequeando que el statusCode de sus respuestas sea el debido, este test se puede ejecutar con el script:
```
npm run supertest
```