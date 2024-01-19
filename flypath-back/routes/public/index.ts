import express from "express";

import destinationRouter from "./destination.routes";

const publicRouter = express.Router();

publicRouter.use("/destination", destinationRouter);

export default publicRouter;
