import express, { NextFunction, Request, Response } from "express";
import { authMiddleware } from "@middlewares/auth.middleware";
import { entryController } from "@controllers/entry";

const entryRouter = express.Router();

entryRouter.post(
  "/register",
  [authMiddleware.registerValidMiddleware],
  (req: Request, res: Response, next: NextFunction) => {
    entryController.register(req.body, next);
  }
);

entryRouter.post(
  "/login",
  [authMiddleware.loginValidMiddleware],
  (req: Request, res: Response, next: NextFunction): void => {
    entryController.login(req.body, next);
  }
);

export default entryRouter;
