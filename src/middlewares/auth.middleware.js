// obviously this is just for demo purposes, this would never be in the code, but like env variable or store secret or loaded in some other way
const ULTRA_SECRET_PASSWORD = "very-secret-password";

export const Auth = async (req, res, next) => {
  const apiKey = req.get("x-api-key");
  if (apiKey !== ULTRA_SECRET_PASSWORD) {
    res.status(403).send("Please provide a valid api key");
    return;
  }

  next();
};
