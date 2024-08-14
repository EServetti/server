import Joi from 'joi';
import JoiOid from "joi-oid"

export const cartValidator = Joi.object({
  product_id: JoiOid.objectId().required().messages({
    'any.required': "please enter the product_id",
    'string.pattern.name': "product_id must be a ObjectId"
  }),
  quantity: Joi.number().min(1).required().messages({
    'any.required': "please enter the quantity"
  }),
  state: Joi.string().valid('reserved', 'paid', 'delivered').messages({
    'any.only': "please enter a valid state"
  })
});

export const UpdateCartValidator = Joi.object({
    product_id: JoiOid.objectId().messages({
      'string.pattern.name': "product_id must be a ObjectId"
    }),
    quantity: Joi.number().min(1),
    state: Joi.string().valid('reserved', 'paid', 'delivered').messages({
      'any.only': "please enter a valid state"
    })
  });
