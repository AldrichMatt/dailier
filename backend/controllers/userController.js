import { auth, checksession, destroysession, encrypt } from "./authController.js";
import { getAll, create, update, getById, remove } from "../models/userModel.js";
import { userSchema } from "../schema/user.js";
import pkg from 'joi';

const { optional } = pkg

// ----------------------
// used to check active user in session
// use this instead of the one in authController
// ----------------------
export const checkUser = (req, res) => {
    const user_id = checksession(req, res);
    res.json({
        user_id : user_id
    }) //return null if user not logged in, else return integer
}

// !! ADD ENCYRPTION !!
// ----------------------
// check user login credential and added user_id to session
// else return corresponding error
// ----------------------
export const loginUser = async (req, res) => {
    const {email, password} = req.body;

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
            res.cookie('session_id', result.user.id, {
            path : '/',
            httpOnly: true,
            sameSite: 'Lax',
            secure: false, // ubah jadi true di production (HTTPS)
            maxAge: 86400000, // 1 hari
            });
            req.session.user_id = result.user.id
            res.json({
                message : "Logged in successfully!",
                status : result.status,
                active_user : result.user.id
            });
            break;
        default:
            break;
    }
}

}

// ----------------------
// log user out and destroy user_id property from session
// 
// ----------------------
export const logout = (req, res) => {
    destroysession(req, res);
}

// ----------------------
// get all user data
// 
// ----------------------
export const getUsers = async (req,res) => {
    const userData = await getAll();
    res.json(userData);
}

// !! ADD ENCYRPTION !!
// ----------------------
// create new user, email and username are unique
// 
// ----------------------
export const newUser = async (req, res) => {
    const {username, email, password, repassword} = req.body;

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
            const hashedpass = encrypt(password);
            const user = await create(username, email, hashedpass)
            req.session.user_id = user.id
            res.json({
                message : "Signed up successfully!",
                data : user
            });
        } catch (error) {
                res.json({
                    "message" : error.meta,
                    "code" : error.code
                })
            console.log(error);
        }
    }

}

// ----------------------
// update user by id
// else return user not found
// ----------------------
export const updateUser = async (req, res) => {
    const {user_id, username, email, password, repassword} = req.body;

    const user = await getById(user_id);

    if(user != null){   
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
            const hashedpass = encrypt(password);
            res.json(await update(user_id, username, email, hashedpass));
        } catch (error) {
            res.json({
                "message" : error.meta,
                "code" : error.code
            })
            console.log(error);
        }
    }}else{
        res.json({
            "message" : "User not found!"
        })
    }
}

// ----------------------
// delete user by id
// else return user not found
// ----------------------
export const deleteUser = async (req, res) => {
    const { user_id } = req.body;

    const user = await getById(user_id)

    try {
        await remove(user_id)
        res.json({
            message : "User " + user.username + " Deleted successfully!"
        })
    } catch (error) {
         res.json({
            message : error.meta,
            code : error.code
        })
    }
}