const fs = require("fs")
const crypto = require("crypto")


class UserManager {
    constructor () {
        this.path = "./fs/files/user.json"
        this.init()
    }
    init() {
        const exists = fs.existsSync(this.path)
        if (!exists) {
            const stringData = JSON.stingify([], null, 2)
            fs.writeFileSync(this.path, stringData)
            console.log("Archivo Creado")
        } else {
            console.log ("Archivo ya existe")
        }
    }
    
        async create(data) {
        const user = {
            id : crypto.randomBytes(12).toString("hex"),
            foto : data.foto || "url" ,
            email : data.email,
            password : data.password,
            role : data.role,
        };

        if (!data.email || !data.password || !data.role)
         { console.log("Usuario no creado. Ingrese todos los datos")}
         else {
            let users = await fs.promises.readFile(this.path, "utf-8")
            users = JSON.parse(users)
            users.push(user);
            console.log("Usuario Creado");
            JSON.strigify (users, null, 2);
            await fs.promises.writeFile(this.path, users)
        }
    }
    async read(){
        let users = await fs.promises.readFile(this.path, "utf-8")
        users = JSON.parse(users)
        return users;
    }

     async readOne (id) {
        let users = await fs.promises.readFile(this.path, "utf-8")
        users = JSON.parse(users);
        return users.find((each) => each.id === id);
    }

     async destroy (id) {
        let users = await fs.promises.readFile(this.path, "utf-8");
        users = JSON.parse(users);
        const filtered = users.filter(each=>each.id!==id);
        await fs.promises.writeFile(filtered);
        console.log((id + "eliminado)"));
    }
}

const gestorDeUsuarios = new UserManager()
await gestorDeUsuarios.create({
    foto: "emilio.jpg" ,
    email: "emilioservetti@gmail.com" ,
    password: "emilio123",
} 
)
await gestorDeUsuarios.create({
    foto: "ignacio.jpg" ,
    email: "ignaciovitello@gmail.com" ,
    password: "ignacio",
} 
)

await gestorDeUsuarios.create({
    foto: "juan.jpg" ,
    email: "juanperez@gmail.com" ,
    password: "juan123",
} 
)
await gestorDeUsuarios.create({
    foto: "micaela.jpg" ,
    email: "micaelaramos@gmail.com" ,
    password: "micaela",
} 
)