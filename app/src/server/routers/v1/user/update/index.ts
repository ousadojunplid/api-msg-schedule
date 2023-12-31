import { Router } from "express";
import { Joi, validate } from "express-validation";
import { changeFieldsUserController } from "../../../../../application/heart/User/changeFields";
import { changeFieldsMessageController } from "../../../../../application/heart/Message/changeFields";
import { changeFieldsProductController } from "../../../../../application/heart/Product/changeFields";
import { changeFieldsPlanProductController } from "../../../../../application/heart/Product/changeFieldsPlan";
import { changeCustomerFieldsController } from "../../../../../application/heart/Customer/changeFields";
import { updatePaymentController } from "../../../../../application/heart/Finance/update";

const router = Router();

router.put(
  "/change-field",
  validate({
    query: Joi.object({
      full_name: Joi.string().max(200).regex(/^\D+$/).messages({
        "string.pattern.base": "Não inclua número(s)",
      }),
      whatsapp: Joi.string().regex(/^\d+$/),
      password: Joi.string().min(6),
    }),
    body: Joi.object({
      userId: Joi.number().min(0).required().messages({
        "number.empty": "Campo obrigatório",
        "any.required": "Campo obrigatório",
        "number.base": "Este campo precisa ser do tipo número",
        "number.min": "Precisa ter no mínimo 0",
      }),
    }),
  }),
  changeFieldsUserController
);

router.put(
  "/change-field-message/:id",
  validate({
    query: Joi.object({
      text: Joi.string().messages({
        "string.base": "Este campo precisa ser uma string",
      }),
      days: Joi.string().regex(/^\d+$/).messages({
        "string.pattern.base": "Insira somente números no campo dia",
      }),
    }),
    params: Joi.object({
      id: Joi.string().regex(/^\d+$/).required().messages({
        "string.pattern.base": "Insira somente números para o id da mensagem",
      }),
    }),
    body: Joi.object({
      userId: Joi.number().min(0).required().messages({
        "number.empty": "Campo obrigatório",
        "any.required": "Campo obrigatório",
        "number.base": "Este campo precisa ser do tipo número",
        "number.min": "Precisa ter no mínimo 0",
      }),
    }),
  }),
  changeFieldsMessageController
);

router.put(
  "/change-field-product/:id",
  validate({
    query: Joi.object({
      name: Joi.string().messages({
        "string.base": "Este campo precisa ser uma string",
      }),
      price: Joi.number(),
    }),
    params: Joi.object({
      id: Joi.string().regex(/^\d+$/).required().messages({
        "string.pattern.base": "Insira somente números para o id da mensagem",
      }),
    }),
    body: Joi.object({
      userId: Joi.number().min(0).required().messages({
        "number.empty": "Campo obrigatório",
        "any.required": "Campo obrigatório",
        "number.base": "Este campo precisa ser do tipo número",
        "number.min": "Precisa ter no mínimo 0",
      }),
    }),
  }),
  changeFieldsProductController
);

router.put(
  "/change-field-plan-product/:productId",
  validate({
    query: Joi.object({
      name: Joi.string().messages({
        "string.base": "Este campo precisa ser uma string",
      }),
      price: Joi.number(),
    }),
    params: Joi.object({
      productId: Joi.string().regex(/^\d+$/).required().messages({
        "string.pattern.base": "Insira somente números para o id da mensagem",
      }),
    }),
    body: Joi.object({
      idPlan: Joi.number().min(0),
      userId: Joi.number().min(0).required().messages({
        "number.empty": "Campo obrigatório",
        "any.required": "Campo obrigatório",
        "number.base": "Este campo precisa ser do tipo número",
        "number.min": "Precisa ter no mínimo 0",
      }),
    }),
  }),
  changeFieldsPlanProductController
);

router.put(
  "/change-field-customer/:id",
  validate({
    params: Joi.object({
      id: Joi.string().regex(/^\d+$/).required().messages({
        "string.pattern.base": "Insira somente números para o id da mensagem",
      }),
    }),
    body: Joi.object({
      userId: Joi.number().min(0).required().messages({
        "number.empty": "Campo obrigatório",
        "any.required": "Campo obrigatório",
        "number.base": "Este campo precisa ser do tipo número",
        "number.min": "Precisa ter no mínimo 0",
      }),
      full_name: Joi.string(),
      whatsapp: Joi.string(),
      login: Joi.string(),
      password: Joi.string(),
      invoice: Joi.string(),
      dueDate: Joi.date(),
      comments: Joi.string(),
      planId: Joi.number(),
      productId: Joi.number(),
      messageId: Joi.array(),
    }),
  }),
  changeCustomerFieldsController
);

router.put(
  "/transaction",
  validate({
    body: Joi.object({
      userId: Joi.number().min(0).required().messages({
        "number.empty": "Campo obrigatório",
        "any.required": "Campo obrigatório",
        "number.base": "Este campo precisa ser do tipo número",
        "number.min": "Precisa ter no mínimo 0",
      }),
      id: Joi.number().min(0).required().messages({
        "number.empty": "Campo obrigatório",
        "any.required": "Campo obrigatório",
        "number.base": "Este campo precisa ser do tipo número",
        "number.min": "Precisa ter no mínimo 0",
      }),
      name: Joi.string().required().messages({
        "string.empty": "Campo obrigatório",
        "any.required": "Campo obrigatório",
        "string.base": "O campo precisa ser uma string",
      }),
      date: Joi.date().required().messages({
        "any.empty": "Campo obrigatório",
        "any.required": "Campo obrigatório",
      }),
      type_transation: Joi.string()
        .regex(/^(PROHIBITED|EXIT)$/)
        .required()
        .messages({
          "string.empty": "Campo obrigatório",
          "any.required": "Campo obrigatório",
          "string.base": "O campo precisa ser uma string",
          "string.pattern.base": "Valor invalido",
        }),
      valueaction: Joi.number(),
      price: Joi.number().min(0).required().messages({
        "any.empty": "Campo obrigatório",
        "any.required": "Campo obrigatório",
        "number.min": "Este campo precisar ser maior ou igual a 0",
      }),
    }),
  }),
  updatePaymentController
);

export { router as RouterUpdate };
