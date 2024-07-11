import {faker, simpleFaker} from "@faker-js/faker"
import dbConnect from "../utils/DbConnection.js"
import productsRepository from "../repositories/productsRepository.js"

const categories = ["hogar","cocina","electrodomésticos"]

async function productMocker(){
  try {
    dbConnect()
    //Logica para evitar que se repitan los nombres
    async function newTitle(){
      let title = "";
      let repited = true;
      while(repited){
        title = faker.commerce.productName();
        const all = await productsRepository.readRepository()
        repited = all.find((p) => p.title === title)
      }
      return title
    }
    for (let i= 0; i < 1000; i++){
      const product = {
        title: await newTitle(),
        description: faker.commerce.productDescription(),
        // imagenes random ya que faker no provee imagenes de products
        photo: faker.image.url(),
        category: simpleFaker.helpers.arrayElement(categories),
        price: faker.commerce.price({ min: 250, max: 3500 }),
        stock: faker.number.int({max: 30}),
      }
      await productsRepository.createRepository(product)
    }
    console.log("The products has been created");
  } catch (error) {
    console.log(error);
    return error
  }
}

productMocker()