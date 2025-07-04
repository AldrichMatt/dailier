import { auth } from "./authController.js";
import { getAllUser, registerUser } from "../models/userModel.js";
import { userSchema } from "../schema/user.js";
import pkg from 'joi';

const { optional } = pkg



export const loginUser = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const partialSchema = userSchema.fork(
        ['username', 'password', 'repassword'],
        (field) => field.optional()
    );

    const validation = partialSchema.validate({
        email : email
    })

    if(validation.error){
        console.log(validation.error.details[0].message);
        res.json(validation.error.details[0])
    }else{
    const result = await auth({email, password});
    switch (result.status) {
        case '403':
            res.json({
                message : "Wrong Password!",
                status : result.status
            });
            break;
        case '404':
            res.json({
                message : "Email not found!",
                status : result.status
            });
            break;
        case '200':
            res.json({
                message : "Logged in successfully!",
                status : result.status
            });
            break;
        default:
            break;
    }
}

}

export const getUsers = async (req,res) => {
    const userData = await getAllUser();
    res.json(userData);
}

export const newUser = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;
    const repassword = req.body.repassword;

    const validate = userSchema.validate({
        email : email,
        password : password,
        username : username,
        repassword : repassword
    })

    if(validate.error){
        res.json(validate.error.details[0])
    }else{
        try {
            res.json(await registerUser(username, email, password));
        } catch (error) {
            if (error.meta.target.includes("email")) {
                res.json({
                    "message" : "Email sudah terdaftar",
                    "code" : error.code
                })
            }else if(error.meta.target.includes("username")){
                res.json({
                    "message" : "Username sudah terdaftar",
                    "code" : error.code
                })
            }else{
                res.json({
                    "message" : error.meta,
                    "code" : error.code
                })
            }
            console.log(error);
        }
    }

}