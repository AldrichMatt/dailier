import { auth } from "./authController.js";
import { getAllUser, registerUser } from "../models/userModel.js";
import { schema } from "./authController.js";



export const loginUser = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const validation = schema.validate({
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

    const validate = schema.validate({
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
            if (error.code == 23505) {
                res.json({
                    "message" : "Email sudah terdaftar",
                    "code" : "23505"
                })
            }
            console.log(error.code);
        }
    }

}