// very very very naive typeguard
const userKeys = [
  "id",
  "first_name",
  "last_name",
  "email",
  "job_title",
  "star",
];
const checkIfUserValid = (user) => {
  return userKeys.every((k) => user[k] !== undefined);
};

export const UsersValidator = {
  createUserValidator: (req, res, next) => {
    const body = req.body;
    const isValid = checkIfUserValid(body);

    if (!isValid) {
      res
        .status(400)
        .send(
          `Not valid request body, make sure you have each of the user keys ${userKeys}`
        );
      return;
    }

    next();
  },
};
