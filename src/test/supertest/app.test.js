import { expect, use } from "chai";
import supertest from "supertest";
import { paginateService } from "../../service/products.api.service.js";

const requester = supertest(`http://localhost:8080/api`)

describe( "Testeando e-commerce", function () {
  this.timeout(20000)
  const user = {
    email: "testing-email@gmail.com",
    name: "Example",
    password: "Example1011",
    age: 18,
    role: 1,
    verify: true
  }
  const product = {
    title: "Product Example",
    description: "The description of the product",
    category: "hogar",
    price: 1500,
    stock: 10
  }
  let token;
  let allProducts;
  let allUsers;
  describe( "Testing enpoints of sessions", () => {
    it( "Register of a user", async () => {
      const response = await requester.post("/sessions/register").send(user)
      const {_body } = response
      expect(_body.statusCode).to.be.equals(201)
    }),
    it( "Login of a user", async () => {
      const response = await requester.post("/sessions/login").send({
        email: "testing-email@gmail.com",
        password: "Example1011"
      })
      const {_body, headers } =  response
      token = headers["set-cookie"][0].split(";")[0]
      expect(_body.statusCode).to.be.equals(200)
    }),
    it( "Fetch data of the user", async () => {
      const response = await requester.post("/sessions").set("Cookie", token)
      const {_body} = response;
      user._id = _body.message._id
      expect(_body.statusCode).to.be.equals(200)
    }),
    it( "Log out", async () => {
      const response = await requester.post("/sessions/signout").set("Cookie", token)
      const {_body} = response
      expect(_body.statusCode).to.be.equals(200)
    }),
    it( "Send email to recover password", async () => {
      const response = await requester.post("/sessions/password").send({
        email: user.email
      })
      const {_body} = response
      expect(_body.statusCode).to.be.equals(200)
    }),
    it( "Updating the password", async () => {
      const response = await requester.put("/sessions/password").send({
        uid: user._id,
        password: "Example1111"
      })
      const {_body} = response
      expect(_body.statusCode).to.be.equals(200)
    })
  })
  describe( "Testing endpoints of products", () => {
    it( "Fetching products with category hogar", async () => {
      const response = await requester.get("/products?category=cocina")
      const {_body} = response
      allProducts = _body.message
      expect(_body.statusCode).to.be.equals(200)
    }),
    it( "Fetching a sole product", async () => {
      const theProduct = allProducts[0]
      const response = await requester.get(`/products/${theProduct._id}`)
      const {_body} = response
      expect(_body.statusCode).to.be.equals(200)
    }),
    it( "Creating a product", async () => {
      const response = await requester.post(`/products`).send(product).set("Cookie", token)
      const {_body} = response
      product._id = _body.message._id
      expect(_body.statusCode).to.be.equals(201)
    }),
    it( "Updating the product", async () => {
      const response = await requester.put(`/products/${product._id}`).send({
        title: "Example Updated"
      }).set("Cookie", token)
      const {_body} = response
      expect(_body.statusCode).to.be.equals(200)
    }), 
    it( "Deleting a product", async () => {
      const response = await requester.delete(`/products/${product._id}`).set("Cookie", token)
      const {_body} = response
      expect(_body.statusCode).to.be.equals(200)
    })
  })
  describe( "Testing endpoints of users", () => {
    it( "Fetching all the users", async () => {
      const response = await requester.get("/users").set("Cookie", token)
      const {_body} = response
      allUsers = _body.message
      expect(_body.statusCode).to.be.equals(200)
    }),
    it( "Fetching one user", async () => {
      const theUser = allUsers[0]
      const response = await requester.get(`/users/${theUser._id}`).set("Cookie", token)
      const {_body} = response
      allUsers = _body.message
      expect(_body.statusCode).to.be.equals(200)
    }),
    it ( "Deleting the first user", async () => {
      const response = await requester.delete(`/users/${user._id}`).set("Cookie", token)
      const {_body} = response
      expect(_body.statusCode).to.be.equals(200)
    })
    it( "Creating a new user", async () => {
      const logged = await requester.post("/sessions/login").send({
        email: "eservetti2018@gmail.com",
        password: "Emilio1011"
      })
      const { headers } =  logged
      token = headers["set-cookie"][0].split(";")[0]
      const copyUser = user
      delete copyUser._id
      const response = await requester.post(`/users`).send(copyUser).set("Cookie", token)
      const {_body} = response
      const _id = _body.message._id
      user._id = _id
      expect(_body.statusCode).to.be.equals(201)
    }),
    it( "Updating the user", async () => {;
      const response = await requester.put(`/users/${user._id}`).send({
        name: "Updated"
      }).set("Cookie", token)
      const {_body} = response
      expect(_body.statusCode).to.be.equals(200)
    }),
    it( "Deleting the user", async () => {;
      const response = await requester.delete(`/users/${user._id}`).set("Cookie", token)
      const {_body} = response
      expect(_body.statusCode).to.be.equals(200)
    })
  })
})