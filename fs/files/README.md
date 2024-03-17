# ProductManager.fs
### Creado por Emilio Servetti
Explicacion: 
### Creacion e inicializacion de la clase 
```
class ProductManager {
  constructor() {
    this.path = "../files/products.json";
    this.init();
  } 
```
Aqui cree la case ProductManager que contendra todo el contenido, tanto metodos como el producto con su estructura, constructor es un metodo que le da la forma base a la clase, definiendo el lugar donde se guardaran los productos con this.path, y luego inicializa el metodo init().
```
init() {
    try {
      const exist = fs.existsSync(this.path);
      if (!exist) {
        const stringData = JSON.stringify([], null, 2);
        fs.writeFileSync(this.path, stringData);
        console.log("File created successfully");
      } else {
        throw new Error('¡The file has already been created!')
      }
    } catch (error) {
      console.log(error);
    }
  }
```
El metodo init() revisa si ya existe el archivo en el path anteriomente creado y le da su valor a la variable exist, luego si no existe: crea una variable stringData y le hace un stringify del contenido inicial del archivo que es un array vacio, luego crea el archivo con el contenido definido anteriormente. Si ya existe el archivo en cambio, devuelve un error '¡The file has already been created!'.

### Metodo create()
```
async create(data) {
    try {
      //revisa que todas las propiedades de product sean ingresadas
      if (
        !data.title ||
        !data.photo ||
        !data.category ||
        !data.price ||
        !data.stock
      ) {
        throw new Error("¡Missing data!");
        return;
      } else {
        const product = {
          id: crypto.randomBytes(12).toString("hex"),
          title: data.title,
          photo:
            data.photo ||
            "https://img.freepik.com/vector-premium/vector-icono-imagen-predeterminado-pagina-imagen-faltante-diseno-sitio-web-o-aplicacion-movil-no-hay-foto-disponible_87543-11093.jpg",
          category: data.category,
          price: data.price,
          stock: data.stock,
        };
        let contant = await fs.promises.readFile(this.path, "utf-8");
        contant = JSON.parse(contant);
        //Reviso que el producto no este creado y lo pusheo a contant
        if (!contant.some(product => product.title === data.title)) {
          contant.push(product);
          console.log("Product created");
        }else{
          throw new Error('¡The product has already been created!')
        }
        contant = JSON.stringify(contant, null, 2);
        await fs.promises.writeFile(this.path, contant);
      }
    } catch (error) {
      console.log(error);
    }
  }
```
En resumen aqui lo que hago es primero revisar si hay alguna propiedad de product faltante, si este es el caso devuelvo un error "¡Missing data!", si estan todas las propiedades creo el objeto product y le doy su estructura, que sera definida por las propiedades que se ingresen exepto por id que se crea con el modulo crypto, ademas photo tiene un valor por defecto en el caso de que el usuario no ingrese la propiedad. 
Luego basicamente lo que hice es leer el archivo que esta en path, parsearlo, revisar si ya contiene un producto con el mismo title que el actual, si esto es asi devuelve el error ¡The product has already been created! si no pushea el nuevo product, despues stringifea de nuevo el contenido y luego actualiza el archivo.
 ## Metodo read()
 ```
 async read() {
    try {
      const contant = await fs.promises.readFile(this.path, "utf-8");
      console.log(contant);
    } catch (error) {
      console.log(error);
    }
  }
```
Este metodo es simple, primero le da a contant el valor del archivo, osea un texto el cual no es necesario parsear porque debe leer todo el contenido, luego se hace un log de contant.
## Metodo readOne(id)
```
 async readOne(id) {
    try {
      let contant = await fs.promises.readFile(this.path, "utf-8");
      contant = JSON.parse(contant);
      let theProduct = contant.find((product) => product.id === id);
      if (!theProduct) {
        throw new Error("¡Product not found!");
      } else {
        console.log('Product found');
        console.log(theProduct);
      }
    } catch (error) {
      console.log(error);
    }
  }
```
Este metodo hace lo mismo que el anterior con la variable contant, luego la parsea y usa el metodo find para encontrar un product que tenga el mismo id que el que se ingreso como propiedad, si este producto no existe devuelve el error "¡Product not found!" en cambio si existe lo devuelve con un log, no es necesario stringifear ni actualizar el archivo ya que no se modifica nada.

## Metodo destroy(id)
```
async destroy(id) {
    try{
      let contant = await fs.promises.readFile(this.path, 'utf-8');
      contant = JSON.parse(contant);
      const delProduct = contant.find((product) => product.id = id);
      if (!delProduct) {
        throw new Error('¡Product not found!');
        return;
      }else {
        let filtered = contant.filter((product) => product.id !== id)
        filtered = JSON.stringify(filtered, null, 2);
        await fs.promises.writeFile(this.path, filtered);
        console.log('The product has been eliminated');
        console.log(delProduct);
      }
    }catch(error){
      console.log(error);
    }
  }
```
En este metodo inicialmente se hace algo parecido al readOne() se busca en contant el product que contenga el id ingresado con .find, si no es encontrado devuelve un error '¡Product not found!', pero si es encontrado crea una varable filtered donde se guardaran todos los product que no coincidan con el id, luego se actualizara el archivo que esta en path con el nuevo valor filtered y ademas devolvera el product eliminado.

## Testeo 
Luego se testean todos los metodos dentro de una funcion llamada test con el uso del awayt para evitar errores en la sobreposicion de metodos.


## Aclaracion:
 En esta clase use los metodos try catch para interceptar errores y el metodo async y promises para hacer los metodos asincronicos.