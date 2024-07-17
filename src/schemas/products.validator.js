import joi from "joi-oid";

export const productValidator = joi.object({
  title: joi.string().pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])")).min(5).max(20).required().messages({
    'any.required': "please enter the title",
    'string.min': "title must have five characters min",
    'string.max': "title can have 20 characters max",
    'string.pattern.base': "title must only have letters"
  }),
  description: joi.string().pattern(new RegExp("^(?=.*[a-zA-Z])[a-zA-Z0-9 ]+$")).min(10).max(60).required().messages({
    'any.required': "please enter the description",
    'string.min': "description must have 10 characters min",
    'string.max': "description can have 60 characters max",
    'string.pattern.base': "description can only have letters and numbers"
  }),
  photo: joi.string().uri().messages({
    'string.uri': "photo must be a real uri"
  }),
  category: joi.string().min(5).max(20).pattern(new RegExp("^[a-z ]+$")).messages({
    'string.pattern.base': "category can only have lower case",
    'string.min': "category must have 5 characters min",
    'string.max': "category can have 20 characters max",
  }),
  price: joi.number(),
  stock: joi.number(),
});

export const updateProductValidator = joi.object({
  title: joi.string().pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])")).min(5).max(20).messages({
    'string.min': "title must have five characters min",
    'string.max': "title can have 20 characters max",
    'string.pattern.base': "title must only have letters"
  }),
  description: joi.string().pattern(new RegExp("^(?=.*[a-zA-Z])[a-zA-Z0-9 ]+$")).min(10).max(60).messages({
    'string.min': "description must have 10 characters min",
    'string.max': "description can have 60 characters max",
    'string.pattern.base': "description can only have letters and numbers"
  }),
  photo: joi.string().uri().messages({
    'string.uri': "photo must be a real uri"
  }),
  category: joi.string().min(5).max(20).pattern(new RegExp("^[a-z ]+$")).messages({
    'string.pattern.base': "category can only have lower case",
    'string.min': "category must have 5 characters min",
    'string.max': "category can have 20 characters max",
  }),
  price: joi.number(),
  stock: joi.number(),
});