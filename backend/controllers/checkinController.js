import { formatCheckinDatetime } from "../models/abstract.js";
import { checkinComplete, createCheckin, getByHabitId, getNotCompletedCheckinbyHabit, getSpecial } from "../models/checkinModel.js"
import { getAllHabitByUserId, getHabitbyFrequency } from "../models/habitModel.js";
import { checksession } from "./authController.js";

// ----------------------
// return habit_id, checkin_datetime and completed, and set one checkin data to completed
// else return Habit doesn't exist
// ----------------------
export const checkinReport = async (req, res) => {
    //Authenticating user
    if(!checksession(req)){
        return res.json({
            message : "Please login first"
        })
    }
    
    try {
        //set completed to true in checkin
        const data = await checkinComplete(parseInt(req.params.id));
        res.json(data)
    } catch (error) {
        //if no habit checkins found under habit and user
        res.json({
            message : error
        })
        console.log(error);
        
    }

    
}

// ----------------------
// return all habit checkin data of a habit for one user
// else return no progress
// ----------------------
export const checkinProgress = async (req, res) => {
    //Authenticating user
    if(!checksession(req)){
        return res.json({
            message : "Please login first"
        })
    }

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

/**
 * TO DO
 * create new checkin based in frequency when day start
 * this function will be used automatically by cron 
 * so don't set the header result
*/
export const checkinHandler = async () => {
    const dailyHabits = await getHabitbyFrequency("DAILY")
    
    console.log(dailyHabits);
    

    // const weeklyHabits = await getHabitbyFrequency("WEEKLY")
    // const monthlyHabits = await getHabitbyFrequency("MONTHLY")
    // const yearlyHabits = await getHabitbyFrequency("YEARLY")
}

/**
 * create new checkin by habit
 * @param {*} habit 
 * @returns new checkin data
 */
export const newCheckinbyHabit = async (habit) => {
    const {id, time} = habit
    const formattedTime = formatCheckinDatetime(time)

    const date = new Date().toISOString().valueOf(formattedTime)

    try {
        const result = await createCheckin(id, date)
        console.log(result);
    } catch (error) {
        return console.log(error)
    }
}

export const getCheckinbyUser = async (req, res) => {

    const user_id = checksession(req)
    if(user_id){
        try {
            //find habit(s) related to user
            const habits = await getAllHabitByUserId(user_id)

            var checkinsData;
            //find checkin(s) related to the habit(s) above
            if(!req.params.completed){
                checkinsData = await Promise.all(
                    habits.map(habit => getByHabitId(habit.id))
                )
            }else{
                checkinsData = await Promise.all(
                    habits.map(habit => getNotCompletedCheckinbyHabit(habit.id))
                )
            }
            res.json({
                checkins : checkinsData.flat()
            })
        } catch (error) {
            console.log(error);
            return res.json({
                message : error
            })   
        }
    }else{
        return res.json({
            message : "Please login first"
        })
    }

}