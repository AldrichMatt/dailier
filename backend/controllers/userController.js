import { auth } from "./authController.js";
import { getAllUser } from "../models/userModel.js";

export const loginUser = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

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

export const getUsers = async (req,res) => {
    const userData = await getAllUser();
    console.log(userData);
    res.json(userData);
}