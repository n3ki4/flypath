import express, { NextFunction, Request, Response } from "express";

import { destinationController } from "@controllers/destination";
import { reformateFilterOptions } from "@controllers/destination/helpers/filter-options-reformate";

const destinationRouter = express.Router();

destinationRouter.get(
  "/list",
  function (req: Request, res: Response, next: NextFunction) {
    destinationController.getDestinationsList(
      reformateFilterOptions(req.query),
      next
    );
  }
);

destinationRouter.get(
  "/item/:id",
  function (req: Request, res: Response, next: NextFunction) {
    destinationController.getDestinationInfo(req.params.id, next);
  }
);

export default destinationRouter;
