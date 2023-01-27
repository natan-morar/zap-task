import csvtojsonV2 from "csvtojson";
import { csvAppend } from "csv-append";

import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const USERS_PATH = join(__dirname, "../data/users.csv");

export const UserRepo = {
  findUserById: async (id) => {
    const jsonArray = await csvtojsonV2().fromFile(USERS_PATH);

    const user = jsonArray.find((u) => u.id === id);
    return user || null;
  },

  createUser: async (user) => {
    // the append assumes that the csv file ends with new line
    const { append, end } = csvAppend(USERS_PATH, true);
    append(user);
    await end();

    return user;
  },
};
