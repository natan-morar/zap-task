import { UsersService } from "./users.service.js";

export const UsersController = {
  getUser: async (req, res) => {
    const id = req.params.id;
    if (!id) {
      res.status(400).send("Please provie an id");
      return;
    }

    const user = await UsersService.findUserById(id);
    if (!user) {
      res.status(404).send("User not found");
      return;
    }

    res.send(user);
  },

  createUser: async (req, res) => {
    const userToCreate = req.body;
    const userResult = await UsersService.createUser(userToCreate);

    res.send(userResult);
  },
};
