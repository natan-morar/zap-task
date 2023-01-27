import { UserRepo } from "./users.repository.js";

export const UsersService = {
  findUserById: async (userId) => {
    return UserRepo.findUserById(userId);
  },
  createUser: async (user) => {
    return UserRepo.createUser(user);
  },
};
