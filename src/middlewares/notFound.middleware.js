export const notFoundErrorHandler = (req, res, next) => {
  res.status(404).send("Seems like you're lost😱. Do you need some help?🕵️");
};
