import Joi from "joi";
import { getUserbyEmail } from "../models/userModel.js"
import { json } from "express";


export const auth = async ({email, password}) => {

  const userData = await getUserbyEmail(email);  
    if(userData == null){
      return {
        status : '404'
      }
    }
    // Dummy auth logic (replace with real DB or logic)
    if (password === userData.password) {
      return({
        status : '200',
        user : userData
      });
    }
    return({
      status : '403'
    });
};