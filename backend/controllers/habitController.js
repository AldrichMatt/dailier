import { create, getAll, getById, update} from "../models/habitModel.js";
import { habitSchema } from "../schema/habit.js";

export const getHabits = async (req, res) => {
    const habitsData = await getAll();
    res.json(habitsData);
}

export const newHabit = async (req, res) => {
    const {user_id, title, description, frequency} = req.body;

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

}

export const updateHabit = async (req, res) => {
    const {habit_id, user_id, title, description, frequency} = req.body;

    const habit = getById(habit_id);

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
            message : "Habit not found"
        })
    }
}