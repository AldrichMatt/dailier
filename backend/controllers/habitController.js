import { create, getAllHabitByUserId, getHabitById, remove, update} from "../models/habitModel.js";
import { checksession } from "./authController.js";

// ----------------------
// return all habits
// 
// ----------------------
export const getHabits = async (req, res) => {
    const habitsData = await getAllHabitByUserId(req);
    res.json({
    habits : habitsData
    });
}

// ----------------------
// create new habit
// 
// ----------------------
export const newHabit = async (req, res) => {
    const {title, description, time, frequency} = req.body;

    const user_id = checksession(req);

    if(user_id != null){
            try {
                res.json(await create(user_id, title, description, time, frequency));
                console.log("Habit created successfully!");
            } catch (error) {
                res.json({
                        "message" : error.meta,
                        "code" : error.code
                })
                console.log(error);
            }
    }else{
        res.json({
            message : "Please login first"
        })
    }
}

// ----------------------
// update habit by id
// else return habit not found
// ----------------------
export const updateHabit = async (req, res) => {
    const {habit_id, user_id, title, description, frequency} = req.body;

    const habit = getHabitById(habit_id);

    if(habit != null){   
        try {
            res.json(await update(habit_id, user_id, title, description, frequency));
            console.log("Habit updated successfully!");
        } catch (error) {
            res.json({
                "message" : error.meta,
                "code" : error.code
            })
        }
    }else{
        res.json({
            "message" : "Habit not found"
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
            res.json({
                message : "Habit " + habit.title + " deleted successfully!"
            })
        }catch (error) {
            res.json({
                message : error.meta,
                code : error.code
            })
        }
    }else{
        res.json({
            message : "Please login first",
            code : 401
        })
    }
    
}