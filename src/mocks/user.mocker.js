import {faker, simpleFaker} from "@faker-js/faker"
import dbConnect from "../utils/DbConnection.js"
import usersRepository from "../repositories/usersRepository.js"

async function userMocker(){
  try {
    dbConnect()
    for (let i= 0; i < 10; i++){
      const product = {
        name: faker.person.firstName(),
        age: faker.number.int({min:12, max: 99}),
        photo: faker.image.avatar(),
        email: `${faker.person.firstName()}${faker.person.lastName()}@gmail.com`,
        password: "1011",
        role: 0,
        verify: true,
      }
      await usersRepository.createRepository(product)
    }
    console.log("The users has been created");
  } catch (error) {
    console.log(error);
  }
}

userMocker()