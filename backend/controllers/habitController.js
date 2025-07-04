import { createHabit, getAllHabits } from "../models/habitModel.js";
import { habitSchema } from "../schema/habit.js";

export const getHabits = async (req, res) => {
    const habitsData = await getAllHabits();
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
            res.json(await createHabit(user_id, title, description, frequency));
        } catch (error) {
            res.json({
                    "message" : error.meta,
                    "code" : error.code
            })
            console.log(error);
        }
    }

}