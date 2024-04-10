import { Router } from "express";

const products = Router();

products.get("/real", async (req, res, next) => {
  try {
    res.render("products-real", {title: "PRODUCTS REAL"})
  } catch (error) {
    return next(error);
  }
});

export default products;
