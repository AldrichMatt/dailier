import { getUserbyEmail } from "../models/userModel.js"
import Joi from "joi";
import { json } from "express";


const schema = Joi.object({
  email : Joi.string().email().required(),
  password : Joi.string().min(8).required()
})



export const auth = async ({email, password}) => {

  console.log("Login attempt:", email, password);

  const result = schema.validate({
    email : email,
    password : password
  })

  if(!result.error){
    const userData = await getUserbyEmail(email);  
    if(userData == null){
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
  }else{
    console.log(result.error.details[0].message);
    return result.error.details[0].message
  }
};