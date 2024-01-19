import "module-alias/register";

import express from "express";
import responseMiddleware from "message-catcher";
import cors from "cors";

import authRouter from "./routes/auth";
import publicRouter from "./routes/public";
import privateRouter from "./routes/private";

const app = express();

const corsOptions = {
  origin: ["http://localhost:3000"],
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/auth", authRouter);
app.use("/public", publicRouter);
app.use("/private", privateRouter);

app.use(responseMiddleware.sendResponse);

const start = () => {
  try {
    // eslint-disable-next-line no-console
    console.log(
      `Connection is established successfully on PORT ${process.env.PORT}`
    );
    app.listen(process.env.PORT);
  } catch (error: unknown) {
    // eslint-disable-next-line no-console
    console.log(`Oops it is Server Error ${error}`);
    process.exit(1);
  }
};

start();

export default app;
