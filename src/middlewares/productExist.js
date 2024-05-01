import productManager from "../data/mongo/managers/ProductManager.db.js";
async function exist (req, res, next) {
try { 
    const { title } = req.body;
    const all = await productManager.read();
    const exist = all.some((product) => product.title === title);
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
            message: "The product has already been created",
        })
    } else {
        next()
    }
} catch (error) {
    return next(error)
}
}
export default exist