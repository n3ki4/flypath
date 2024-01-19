import express, { NextFunction, Request, Response } from "express";

import { authMiddleware } from "@middlewares/auth.middleware";

import { ticketController } from "@controllers/ticket";

const ticketRouter = express.Router();

ticketRouter.post(
  "/item",
  [authMiddleware.verifyToken],
  function (req: Request, res: Response, next: NextFunction) {
    ticketController.makeTickets(req.body, res.locals.user.userId, next);
  }
);

ticketRouter.get(
  "/list",
  [authMiddleware.verifyToken],
  function (req: Request, res: Response, next: NextFunction) {
    ticketController.getTicketsList(res.locals.user.userId, next);
  }
);

ticketRouter.get(
  "/item/:id",
  [authMiddleware.verifyToken],
  function (req: Request, res: Response, next: NextFunction) {
    ticketController.getTicketInfo(req.params.id, next);
  }
);

export default ticketRouter;
