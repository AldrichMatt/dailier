import { db } from "../models/Model.js";
import { json } from "express";

const fetchUserData = (email) => {
  return db.oneOrNone("SELECT * FROM users WHERE email = $1", [email]);
}

export const auth = async ({email, password}) => {

  console.log("Login attempt:", email, password);

  const userData = await fetchUserData(email);

  if(!userData){
    return {
      message : "No user found!",
      status : '404'
    }
  }
  // Dummy auth logic (replace with real DB or logic)
  if (password === userData.password) {
    return({
      message: "Login successful!",
      status : '200',
      user : userData
    });
  }
  return({
    message: "Invalid credentials",
    status : '403'
  });
};