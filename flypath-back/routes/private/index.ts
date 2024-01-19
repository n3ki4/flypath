import express from "express";

import ticketRouter from "./ticket.routes";

const privateRouter = express.Router();

privateRouter.use("/ticket", ticketRouter);

export default privateRouter;
