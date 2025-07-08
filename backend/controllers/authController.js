import { getByEmail } from "../models/userModel.js"

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

export const destroysession = (req, res) => {
  req.session.destroy(err => {
      if (err) {
        res.json({ message: 'Logout failed' });
      }else{
        res.json({ message: 'Logged out' });
      }
    });
}