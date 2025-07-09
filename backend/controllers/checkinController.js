import { checkinComplete, getByHabitId, getSpecial } from "../models/checkinModel.js"
import { checkUser } from "./userController.js"

export const checkinReport = async (req, res) => {
    checkUser(req, res);
    
    const habit = await getSpecial(req)
    
    if(habit != null){
        const data = await checkinComplete(habit.id);
        res.json(data)
    }else{
        res.json({
            message : "Habit doesn't exist"
        })
    }
    
}

export const checkinProgress = async (req, res) => {
    checkUser(req, res)

    const habit_id = parseInt(req.params.id)
    const progress = await getByHabitId(habit_id)

    res.json(progress)
}