import { auth } from "./authController.js";

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
            res.status().json({
                message : "Email not found!",
                status : result.status
            });
            break;
        case '200':
            res.status().json({
                message : "Logged in successfully!",
                status : result.status
            });
            break;
        default:
            break;
    }

}