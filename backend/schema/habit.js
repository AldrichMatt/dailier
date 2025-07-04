import Joi from "joi";

export const habitSchema = Joi.object({
    user_id : Joi.number().required(),
    title : Joi.string().required(),
    description : Joi.string(),
    frequency : Joi.string()
    .valid(
        "DAILY",
        "WEEKLY",
        "MONTHLY",
        "YEARLY")
    .required(),
})