import { create, getAllHabitByUserId, getHabitById, remove, update} from "../models/habitModel.js";
import { checksession } from "./authController.js";
import { sendToUser } from "../middleware/checkinWebSocket.js";

// ----------------------
// return all habits
// 
// ----------------------
export const getHabits = async (req, res) => {

    const user_id = checksession(req);    
    if(user_id){
        const habitsData = await getAllHabitByUserId(user_id);
        return res.json({
            habits : habitsData
        });
    }else{
        return res.json({
            message : "Please login first"
        })
    }
}

// ----------------------
// create new habit
// 
// ----------------------
export const newHabit = async (req, res) => {
    const {title, description, time, frequency} = req.body;

    const user_id = checksession(req);

    if(user_id){
        try {
                const result = await create(user_id, title, description, time, frequency)
                sendToUser(user_id, result)
                return res.json(result);
            } catch (error) {
                console.log(error);
                return res.json({
                        message : error.meta,
                        code : error.code
                })
            }
    }else{
        return res.json({
            message : "Please login first"
        })
    }
}

// ----------------------
// update habit by id
// else return habit not found
// ----------------------
export const updateHabit = async (req, res) => {
    const {habit_id, title, description, frequency, time} = req.body;

    const habit = getHabitById(habit_id);

    if(habit != null){   
        try {
            return res.json(await update(habit_id, title, description, time, frequency));
        } catch (error) {
            return res.json({
                message : error.meta,
                code : error.code
            })
        }
    }else{
        return res.json({
            message : "Habit not found"
        })
    }
}

// ----------------------
// delete habit by id
// else return error code
// ----------------------
export const deleteHabit = async (req, res) => {
    const {habit_id} = req.body;
    const user_id = checksession(req);

    const habit = await getHabitById(habit_id)

    if(user_id != null){
        try {
            await remove(habit_id);
            return res.json({
                message : "Habit " + habit.title + " deleted successfully!"
            })
        }catch (error) {
            return res.json({
                message : error.meta,
                code : error.code
            })
        }
    }else{
        return res.json({
            message : "Please login first",
            code : 401
        })
    }
    
}