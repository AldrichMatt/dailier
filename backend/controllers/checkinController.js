import { checkinComplete, getByHabitId, getSpecial } from "../models/checkinModel.js"
import { checkUser } from "./userController.js"

// ----------------------
// return and set one checkin data to completed
// else return Habit doesn't exist
// ----------------------
export const checkinReport = async (req, res) => {
    //Authenticating user
    checkUser(req, res);
    
    //get habit based on user and habit
    const habit = await getSpecial(req)
    
    if(habit != null){
        //set completed to true in checkin
        const data = await checkinComplete(habit.id);
        res.json(data)
    }else{
        //if no habit checkins found under habit and user
        res.json({
            message : "Habit doesn't exist"
        })
    }
    
}

// ----------------------
// return all habit checkin data of a habit for one user
// else return no progress
// ----------------------
export const checkinProgress = async (req, res) => {
    //Authenticating user
    checkUser(req, res)

    const habit_id = parseInt(req.params.id)
    const progress = await getByHabitId(habit_id)

    if (progress) {
        res.json(progress)
    }else{
        res.json({
            message : "No progress"
        })
    }

}