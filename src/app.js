import express from "express";
import path from "path";
import { notFoundErrorHandler } from "./middlewares/notFound.middleware.js";
import { usersRouter } from "./api/users.routes.js";
import { _dirname } from "./utils/defaultConsts.js";

const port = 3333;
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from Zaptic! 👋💜");
});

app.get("/zaptic", (req, res) => {
  res.sendFile(path.join(_dirname, "/public/res/zaptic_logo.jpeg"));
});

app.use("/users", usersRouter);

app.use(notFoundErrorHandler);

app.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`);
});

export default app;
