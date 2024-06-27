import args from "../../utils/args.util.js"
import crypto from "crypto"
import { createHash } from "../../utils/hash.js"

const {pers} = args

class UserDTO {
    constructor(data) {
        pers !== "mongo" && (
        this._id = crypto.randomBytes(12).toString("hex"))
        this.email = data.email;
        this.password = createHash(data.password);
        this.photo = data.photo || "/img/defaultUser.webp";
        this.name = data.name;
        this.age = data.age || 12;
        this.role = data.role || 0;
        this.verify =  data.verify || false
        this.verifyCode =crypto.randomBytes(6).toString("hex")
        pers !== "mongo" && (this.createdAt = new Date())
        pers !== "mongo" && (this.updatedAt = new Date())
    }
}

export default UserDTO