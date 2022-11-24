import express from "express";
import {fetchUserById, fetchUsers, saveUser, UserNotFoundError} from "../services/users.js";
import isValidModel from '../middlewares/isValidModel.js';
import isAuth from '../middlewares/isAuth.js';
import userSchema from "../validators/user.js";

const apiRouter = express.Router();

apiRouter.get('/', async (req, res) => {
    const users = await fetchUsers();

    res.json(users);
    res.end();
});

apiRouter.post('/', isAuth('password'), isValidModel(userSchema), async (req, res) => {
    const user = await saveUser(req.body);

    res.json(user);
});

apiRouter.get('/:id', async (req, res) => {
    let user;

    try {
        user = await fetchUserById(parseInt(req.params.id))
    } catch (error) {
        if (error instanceof UserNotFoundError) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(503).json({ message: 'Internal server error' });
    }

    res.json(user);
});

export default apiRouter;