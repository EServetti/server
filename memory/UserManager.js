const crypto = require("crypto")




class UserManager {
    static #users = [];
    create(data) {
        const user = {
            id : crypto.randomBytes(12).toString("hex"),
            foto : data.foto || "url" ,
            email : data.email,
            password : data.password,
            role : data.role,
        };

        if (!data.email || !data.password || !data.role)
         { console.log("Usuario no creado. Ingrese todos los datos")}
         else {UserManager.#users.push(user);
        console.log("Usuario Creado");}
    }
    read(){
        return UserManager.#users
    }

    readOne (id) {
        return UserManager.#users.find(each=>each.id===id);
    }

    destroy (id) {
        const filtered = UserManager.#users.filter(each=>each.id!==id);
        UserManager.#users = filtered;
        console.log((id + "eliminado)"))
    }
}

const gestorDeUsuarios = new UserManager()
gestorDeUsuarios.create({
    foto: "emilio.jpg" ,
    email: "emilioservetti@gmail.com" ,
    password: "emilio123",
} 
)
gestorDeUsuarios.create({
    foto: "ignacio.jpg" ,
    email: "ignaciovitello@gmail.com" ,
    password: "ignacio",
} 
)

gestorDeUsuarios.create({
    foto: "juan.jpg" ,
    email: "juanperez@gmail.com" ,
    password: "juan123",
} 
)
gestorDeUsuarios.create({
    foto: "micaela.jpg" ,
    email: "micaelaramos@gmail.com" ,
    password: "micaela",
} 
)

console.log (gestorDeUsuarios.read())