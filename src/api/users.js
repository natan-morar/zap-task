import { fetchUserById, fetchUsers, UserNotFoundError } from "../services/users.js";
import express from "express";

const apiRouter = express.Router();

apiRouter.get('/', async (req, res) => {
    const users = await fetchUsers();

    res.json(users);
    res.end();
});

apiRouter.get('/:id', async (req, res) => {
    let user;

    try {
        user = await fetchUserById(req.params.id)
    } catch (error) {
        if (error instanceof UserNotFoundError) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.status(503).json({ error: 'Internal server error' });
    }

    res.json(user);
});

export default apiRouter;