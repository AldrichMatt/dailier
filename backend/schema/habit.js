import Joi from "joi";

export const habitSchema = Joi.object({
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