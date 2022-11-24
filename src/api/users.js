import express from "express";
import UserService from "../services/user.js";
import isValidModel from "../middlewares/isValidModel.js";
import isAuth from "../middlewares/isAuth.js";
import userSchema from "../validators/user.js";

const apiRouter = express.Router();

apiRouter.get("/", async (req, res) => {
    const users = await UserService.fetchUsers();

    res.json(users);
    res.end();
});

apiRouter.post("/", isAuth('password'), isValidModel(userSchema), async (req, res) => {
    const user = await UserService.saveUser(req.body);

    res.json(user);
});

apiRouter.get("/:id", async (req, res) => {
    let user;
    const userId = parseInt(req.params.id);

    try {
        user = await UserService.fetchUserById(userId)
    } catch (error) {
        if (error instanceof UserNotFoundError) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(503).json({ message: 'Internal server error' });
    }

    res.json(user);
});

export default apiRouter;