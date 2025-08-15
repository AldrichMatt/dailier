import { checkinComplete, getByHabitId, getSpecial } from "../models/checkinModel.js"
import { getAllHabitByUserId, getHabitbyFrequency } from "../models/habitModel.js";
import { checksession } from "./authController.js";
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

// ---------------------- TO DO
// create new checkin
// this function will be used automatically by cron 
// so don't set the header result
// ----------------------
export const checkinHandler = async () => {
    const dailyHabits = await getHabitbyFrequency("DAILY")
    
    console.log(dailyHabits);
    

    // const weeklyHabits = await getHabitbyFrequency("WEEKLY")
    // const monthlyHabits = await getHabitbyFrequency("MONTHLY")
    // const yearlyHabits = await getHabitbyFrequency("YEARLY")
}

export const getCheckinbyUser = async (req, res) => {

    const user_id = checksession(req)
    if(user_id){
        try {
            
            const habits = await getAllHabitByUserId(user_id)
            
            const checkins = await Promise.all(
                habits.map(habit => getByHabitId(habit.id))
            )
            res.json(checkins.flat())
        } catch (error) {
            console.log(error);
            res.json({
                message : error
            })   
        }
    }else{
        return res.json({
            message : "Please login first"
        })
    }

}