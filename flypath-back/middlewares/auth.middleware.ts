import { NextFunction, Request, Response } from "express";
import { Joi, validate } from "express-validation";
import jwt from "jsonwebtoken";
import { RESPONSE_CODES } from "message-catcher";
import { errorCatcher } from "@helpers/error-catcher";

const registerValidation = {
  body: Joi.object({
    email: Joi.string().normalize().email().required(),
    password: Joi.string().min(6).required(),
    phone: Joi.string().max(15),
    type: Joi.string(),
    identifier: Joi.object({
      firstName: Joi.string(),
      birthday: Joi.date(),
      lastName: Joi.string(),
      code: Joi.number(),
      publisher: Joi.string(),
    }),
  }),
};

const loginValidation = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    type: Joi.string(),
  }),
};

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.headers["x-access-token"] as string;

    if (!token) {
      errorCatcher({
        responseCode: RESPONSE_CODES.P_ERROR__UNAUTHORIZED,
        message: "A token is required for authentication",
      });
      return;
    }

    res.locals.user = jwt.verify(
      token,
      process.env.JWT_S || "no-jwt-secret-provided"
    );

    next();
  } catch (error) {
    next({
      responseCode: RESPONSE_CODES.P_ERROR__FORBIDDEN,
      message: error,
    });
  }
};

export const authMiddleware = {
  verifyToken,
  registerValidMiddleware: validate(registerValidation, {}, {}),
  loginValidMiddleware: validate(loginValidation, {}, {}),
};
