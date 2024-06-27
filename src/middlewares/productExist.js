import { readService } from "../service/products.api.service.js";
async function exist (req, res, next) {
try { 
    const { title } = req.body;
    const all = await readService();
    const exist = all.some((product) => product.title === title);
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