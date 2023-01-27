import csvtojsonV2 from "csvtojson";
import { csvAppend } from "csv-append";

import { join } from "path";
import { _dirname } from "../utils/defaultConsts.js";

const USERS_PATH = join(_dirname, "../data/users.csv");

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
