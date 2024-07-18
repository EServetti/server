import Joi from 'joi';
import JoiObjectId from 'joi-objectid';

// Extiende Joi con JoiObjectId
Joi.objectId = JoiObjectId(Joi);

export const cartValidator = Joi.object({
  product_id: Joi.objectId().required().messages({
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
    product_id: Joi.objectId().messages({
      'string.pattern.name': "product_id must be a ObjectId"
    }),
    quantity: Joi.number().min(1),
    state: Joi.string().valid('reserved', 'paid', 'delivered').messages({
      'any.only': "please enter a valid state"
    })
  });
