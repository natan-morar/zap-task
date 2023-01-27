import { Router } from "express";
import { Auth } from "../middlewares/auth.middleware.js";
import { UsersController } from "../users/users.controller.js";
import { UsersValidator } from "../users/users.validator.js";

export const usersRouter = Router();

usersRouter
  .route("/")
  .post(Auth, UsersValidator.createUserValidator, UsersController.createUser);
usersRouter.route("/:id").get(UsersController.getUser);
