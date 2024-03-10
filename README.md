# server
ProductManager creada por Emilio Servetti explicacion:
class ProductManager: se crea la clase que contendra el array, la estructura de los productos y los metodos a usar.

static #products = [];: se crea una variable de la clase privada donde se guardaran los productos.

create(data): se crea el metodo para crear un nuevo producto ingresando las propiedades (data) que tendra el mismo.
if (!data.title || !data.photo || !data.category || !data.price || !data.stock): se crea una condicional en la cual si una de las propiedades requeridas no es ingresada no se ejecutara la creacion del product y se devuelve un log con el mensaje 'No se ha ingresado una propiedad'.

const product: aqui es donde se define el product, (solo se ejecutara si fueron ingresadas todas las propiedades), la unica propiedad que no debe ser ingresada es el id.

id: ProductManager.#products.length === 0 ? 1 : ProductManager.#products[ProductManager.#products.length - 1].id + 1,: aqui es donde se define automaticamente el id, primero se pregunta si la cantidad de elementos dentro del array products es 0 si este es el caso se le da a id el valor 1, si ya hay elementos existentes dentro del array se busca el valor del ultimo elemento del array y se le suma uno para darle valor al id.

ProductManager.#products.push(product);: se guarda el nuevo product en el array products.

read(): se crea un metodo para devolver los product guardados en products.

readOne(): aqui agregue un metodo para devolver un product especifico segun su id, se usa un for of para revisar cada elemento del array products y si uno de estos coincide con el id ingresado en (data) lo devuelve, en el caso de que ninguno coincida devuelve un log de "Id de producto no existente".

const producto = new ProductManager;: Aqui ya fuera de la clase cree una constante llamada producto que invoca a la clase ProductManager.

Luego cree 5 productos, uno de ellos con el title comentado para probar la reaccion cuando un producto no tiene todas sus propiedades.

console.log(producto.read());: aqui hice un log de todos los productos.

console.log(producto.readOne(1)): aqui solo use el metodo readOne para hacer un log de un producto epecifico de id 1.

console.log(producto.readOne(10)): aqui especifique un id np existente para probar la reaccion ante esto.

La parte de users fue creada por mi compañero Ignacio Vitello.
