import joi from "joi-oid";

//Validador de creación
export const usersValidate = joi.object({
  name: joi.string().min(4).max(12).alphanum().required().messages({
    "any.required": "please enter a username",
    "string.min": "the name must have 4 characters min",
    "string.max": "the name can have 12 characters max",
    "string.alphanum": "name must be alpha-numeric",
  }),
  age: joi.number().min(12).max(90).messages({
    "number.base": "age must be a number",
    "number.min": "age must be 12 or greater",
    "number.max": "age must be 90 or smaller",
  }),
  photo: joi.string().uri().messages({
    "string.uri": "photo must be a real url",
  }),
  email: joi.string().email().required().messages({
    "any.required": "please enter your email",
    "string.email": "email must be valid",
  }),
  password: joi
    .string()
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$"))
    .required()
    .min(4)
    .max(12)
    .messages({
      "any.required": "please enter a password",
      "string.min": "the password must have 4 characters min",
      "string.max": "the password can have 12 characters max",
      "string.pattern.base":
        "the password must have at least one upper case, one lower case and one number.",
    }),
  phone: joi.string().pattern(new RegExp("^[0-9\\-\\+]{9,15}$")).messages({
    "string.pattern.base": "phone number must be valid",
  }),
});

//Validador de actualización
export const updateUsersValidate = joi.object({
  name: joi.string().min(4).max(12).alphanum().messages({
    "any.required": "please enter a username",
    "string.min": "the name must have 4 characters min",
    "string.max": "the name can have 12 characters max",
    "string.alphanum": "name must be alpha-numeric",
  }),
  age: joi.number().min(12).max(90).messages({
    "number.base": "age must be a number",
    "number.min": "age must be 12 or greater",
    "number.max": "age must be 90 or smaller",
  }),
  photo: joi.string().uri().messages({
    "string.uri": "photo must be a real url",
  }),
  email: joi.string().email().messages({
    "any.required": "please enter your email",
    "string.email": "email must be valid",
  }),
  password: joi
    .string()
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$"))
    .min(4)
    .max(12)
    .messages({
      "any.required": "please enter a password",
      "string.min": "the password must have 4 characters min",
      "string.max": "the password can have 12 characters max",
      "string.pattern.base":
        "the password must have at least one upper case, one lower case and one number.",
    }),
  phone: joi.string().pattern(new RegExp("^[0-9\\-\\+]{9,15}$")).messages({
    "string.pattern.base": "phone number must be valid",
  }),
});

//Validador de actualización de password( recuperar tu contraseña)
export const updatePassValidator = joi.object({
  uid: joi.objectId(),
  password: joi
    .string()
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$"))
    .min(4)
    .max(12)
    .required()
    .messages({
      "any.required": "please enter a password",
      "string.min": "the password must have 4 characters min",
      "string.max": "the password can have 12 characters max",
      "string.pattern.base":
        "the password must have at least one upper case, one lower case and one number.",
    }),
});
