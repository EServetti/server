import userManager from "../data/mongo/managers/UserManager.db.js";
async function exist (req, res, next) {
try { 
    const { email } = req.body;
    const all = await userManager.read();
    const exist = all.some((user) => user.email === email);
    console.log(req.body);
    //console.log(all);
    /*all.some((product)=> {
        console.log(title)
        console.log(product.title)
        console.log(title===product.title)
        return title===product.title
     })*/
    if (exist) {
        res.status(400).json({
            statusCode: 400,
            message: "The user has already been created",
        })
    } else {
        next()
    }
} catch (error) {
    return next(error)
}
}
export default exist