import { db } from "./Model.js";
import { getTimestamps } from "./abstract.js";

export const getAllUser = () => {
    return db.manyOrNone("SELECT * FROM users");
}

export const getUserbyEmail = (email) => {
  return db.oneOrNone("SELECT * FROM users WHERE email = $1", [email]);
}

export const registerUser = (username, email, password) => {
  return db.query("INSERT INTO users (email, username, password) VALUES ($1, $2, $3)", [email, username, password])
}
