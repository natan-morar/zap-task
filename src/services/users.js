import fs from "fs";
import path from "path";
import { parse } from "csv-parse";

function getUserObject(row) {
    const [id, first_name, last_name, email, job_title, star] = row;

    return {
        id: parseInt(id, 10),
        first_name,
        last_name,
        email,
        job_title,
        star: star === "true",
    };
}

function getUsersStream() {
    return fs.createReadStream(path.join(path.resolve(), 'src/data/users.csv'))
        .pipe(parse({
            columns: false,
            skip_empty_lines: true
        }));
}

export class UserNotFoundError extends Error {}

export class InvalidArgumentError extends Error {}

/**
 * @typedef {Object} User
 * @property {Number} id
 * @property {String} first_name
 * @property {String} last_name
 * @property {String} email
 * @property {Number} star
 */

/**
 * Returns all users from the database (CSV datastore).
 *
 * @returns {Promise<User[]>}
 */
export async function fetchUsers() {
    const usersStream = getUsersStream();
    const users = [];

    for await (const row of usersStream) {
        const user = getUserObject(row);

        users.push(user);
    }

    return users;
}

/**
 * Returns a user model by its id.
 *
 * @param {Number} id - The id of the user to fetch
 * @returns {Promise<User>}
 * @throws InvalidArgumentError
 * @throws UserNotFoundError
 */
export async function fetchUserById(id) {
    if (!id) {
        throw new InvalidArgumentError("Missing `id` param value");
    }

    const usersStream = await getUsersStream();

    for await (const row of usersStream) {
        const user = getUserObject(row);

        if (user.id === id) {
            return user;
        }
    }

    throw new UserNotFoundError(`Couldn't find user with id '${id}'`);
}