import { expect } from "chai";
import supertest from "supertest";

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
  let token;
  describe( "Testeando enpoints de sessions", () => {
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
})