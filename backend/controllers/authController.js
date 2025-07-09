import { getByEmail } from "../models/userModel.js"

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

// ----------------------
// check current active user and return user_id
// if none, return please login
// ----------------------
export const checksession = (req, res) => {
  if(req.session.user_id){
    return({
      user_id : req.session.user_id
    })
  }else{
    res.json({
      message : "please login",
      user_id : null
    })
  }
}

// ----------------------
// destroy current session
// forcing user to login
// ----------------------
export const destroysession = (req, res) => {
  res.clearCookie('connect.sid');
  req.session.destroy(err => {
      if (err) {
        res.json({ message: 'Logout failed' });
      }else{
        res.json({ message: 'Logged out' });
      }
    });
}