import { getByEmail } from "../models/userModel.js"
import bcrypt, { hash } from "bcryptjs";

// !! ADD ENCYRPTION !!
// ----------------------
// check and return if email and password match the record in database
// else return 404 if no email found, or 403 if condition above not met
// ----------------------
export const auth = async ({email, password}) => {

  const userData = await getByEmail(email);  
    if(userData == null){
      return {
        status : '404'
      }
    }
    // Dummy auth logic (replace with real DB or logic)
    if (bcrypt.compareSync(password, userData.password)) {
      return({
        status : '200',
        user : userData
      });
    }
    return({
      status : '403'
    });
};

// ----------------------
// check current active user and return user_id
// if none, return please login
// ----------------------
export const checksession = (req, res) => {
  if(req.session.user_id){
    return req.session.user_id
  }else{
    return null
  }
}

// ----------------------
// destroy current session
// forcing user to login
// ----------------------
export const destroysession = (req, res) => {
  req.session.destroy(err => {
    if (err) {
        console.log("logout failed");
        res.json({ message: 'Logout failed' });
      }else{
        res.clearCookie('session_id');
        res.clearCookie('connect.sid');
        res.json({ message: 'Logged out' });
      }
    });
}

export const encrypt = (message) => {
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(message, salt)
  return hash;
}