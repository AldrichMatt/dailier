import { create, getAllHabitByUserId, getHabitById, remove, update} from "../models/habitModel.js";
import { habitSchema } from "../schema/habit.js";
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
    const {title, description, frequency} = req.body;

    const user_id = checksession(req, res);

    if(user_id != null){
        const validate = habitSchema.validate({
            title : title,
            description : description,
            frequency : frequency
        })

        if(validate.error){
            res.json(validate.error.details[0])
        }else{
            try {
                res.json(await create(user_id, title, description, frequency));
                console.log("Habit created successfully!");
            } catch (error) {
                res.json({
                        "message" : error.meta,
                        "code" : error.code
                })
                console.log(error);
            }
        }
    }else{
        res.json({
            "message" : "Please Login"
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
        const validate = habitSchema.validate({
            user_id : user_id,
            title : title,
            description : description,
            frequency : frequency
        })

        if(validate.error){
            res.json(validate.error.details[0])
        }else{
            try {
                res.json(await update(habit_id, user_id, title, description, frequency));
                console.log("Habit updated successfully!");
            } catch (error) {
                res.json({
                    "message" : error.meta,
                    "code" : error.code
                })
            }
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

    const habit = await getHabitById(habit_id)

    console.log(habit);
    try {
        await remove(habit_id);
        res.json({
            message : "Habit " + habit.title + " Deleted successfully!"
        })
    } catch (error) {
        res.json({
            message : error.meta,
            code : error.code
        })
    }
}