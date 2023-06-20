import { Router } from "express";
import { createMessageController } from "../../../../../application/heart/Message/create";
import { Joi, validate } from "express-validation";
import { createProductController } from "../../../../../application/heart/Product/create";
import { createCustomerController } from "../../../../../application/heart/Customer/create";

const router = Router();

router.post(
  "/message",
  validate({
    body: Joi.object({
      text: Joi.string().required().messages({
        "string.empty": "Campo obrigatório",
        "any.required": "Campo obrigatório",
        "string.base": "Este campo precisa ser uma string",
      }),
      userId: Joi.number().min(0).required().messages({
        "number.empty": "Campo obrigatório",
        "any.required": "Campo obrigatório",
        "number.base": "Este campo precisa ser do tipo número",
        "number.min": "Precisa ter no mínimo 0",
      }),
      days: Joi.number().min(0).required().messages({
        "any.empty": "Campo obrigatório",
        "any.required": "Campo obrigatório",
        "number.min": "Este campo precisar ser maior ou igual a 0",
      }),
    }),
  }),
  createMessageController
);

router.post(
  "/product-service",
  validate({
    body: Joi.object({
      userId: Joi.number().min(0).required().messages({
        "number.empty": "Campo obrigatório",
        "any.required": "Campo obrigatório",
        "number.base": "Este campo precisa ser do tipo número",
        "number.min": "Precisa ter no mínimo 0",
      }),
      name: Joi.string().required().messages({
        "string.empty": "Campo obrigatório",
        "any.required": "Campo obrigatório",
        "string.base": "Este campo precisa ser uma string",
      }),
      price: Joi.number().min(0).required().messages({
        "any.empty": "Campo obrigatório",
        "any.required": "Campo obrigatório",
        "number.min": "Este campo precisar ser maior ou igual a 0",
      }),
      plans: Joi.array().items(
        Joi.object({
          name: Joi.string().required().messages({
            "string.empty": "Campo obrigatório",
            "any.required": "Campo obrigatório",
            "string.base": "Este campo precisa ser uma string",
          }),
          price: Joi.number().min(0).required().messages({
            "any.empty": "Campo obrigatório",
            "any.required": "Campo obrigatório",
            "number.min": "Este campo precisar ser maior ou igual a 0",
          }),
        })
      ),
    }),
  }),
  createProductController
);

router.post(
  "/customer",
  validate({
    body: Joi.object({
      userId: Joi.number().min(0).required().messages({
        "number.empty": "Campo obrigatório",
        "any.required": "Campo obrigatório",
        "number.base": "Este campo precisa ser do tipo número",
        "number.min": "Precisa ter no mínimo 0",
      }),
      full_name: Joi.string().required().messages({
        "string.empty": "Campo Nome obrigatório",
        "any.required": "Campo Nome obrigatório",
        "string.base": "O campo Nome precisa ser uma string",
      }),
      whatsapp: Joi.string().required().messages({
        "string.empty": "Campo obrigatório",
        "any.required": "Campo obrigatório",
        "string.base": "Este campo precisa ser uma string",
      }),
      login: Joi.string().required().messages({
        "string.empty": "Campo obrigatório",
        "any.required": "Campo obrigatório",
        "string.base": "Este campo precisa ser uma string",
      }),
      password: Joi.string().required().messages({
        "string.empty": "Campo obrigatório",
        "any.required": "Campo obrigatório",
        "string.base": "Este campo precisa ser uma string",
      }),
      invoice: Joi.string().required().messages({
        "string.empty": "Campo obrigatório",
        "any.required": "Campo obrigatório",
        "string.base": "Este campo precisa ser uma string",
      }),
      dueDate: Joi.date().required().messages({
        "any.empty": "Campo obrigatório",
        "any.required": "Campo obrigatório",
        "any.base": "Este campo precisa ser uma string",
      }),
      comments: Joi.string().required().messages({
        "string.empty": "Campo obrigatório",
        "any.required": "Campo obrigatório",
        "string.base": "Este campo precisa ser uma string",
      }),
      planId: Joi.number().min(0).required().messages({
        "any.empty": "Campo obrigatório",
        "any.required": "Campo obrigatório",
        "number.min": "Este campo precisar ser maior ou igual a 0",
      }),
      productId: Joi.number().min(0).required().messages({
        "any.empty": "Campo obrigatório",
        "any.required": "Campo obrigatório",
        "number.min": "Este campo precisar ser maior ou igual a 0",
      }),
      messageId: Joi.array().items(
        Joi.number().min(0).required().messages({
          "any.empty": "Campo obrigatório",
          "any.required": "Campo obrigatório",
          "number.min": "Este campo precisar ser maior ou igual a 0",
        })
      ),
    }),
  }),
  createCustomerController
);

export { router as RouterCreate };
