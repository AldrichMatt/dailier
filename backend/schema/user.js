import Joi from "joi";

const passwordSchema = Joi.string()
  .min(8)                                  // Minimum 8 characters
  .max(128)                                // Optional max length
  .pattern(new RegExp('[a-z]'))            // At least one lowercase
  .pattern(new RegExp('[A-Z]'))            // At least one uppercase
  .pattern(new RegExp('[0-9]'))            // At least one digit
  .pattern(new RegExp('[^a-zA-Z0-9]'))     // At least one special character
  .required()
  .messages({
    'string.base': 'Password must be a string.',
    'string.empty': 'Password is required.',
    'string.min': 'Password must be at least 8 characters.',
    'string.max': 'Password must be no more than 128 characters.',
    'string.pattern.base': 'Password must include lowercase, uppercase, digit, and special character.',
});


export const userSchema = Joi.object({
  email : Joi.string().email().required(),
  username : Joi.string().alphanum().required().min(4).max(16),
  password : passwordSchema,
  repassword : Joi.string().required()
    .valid(Joi.ref('password'))
    .messages({
    'any.only': 'Passwords do not match.',
    'string.empty': 'Please confirm your password.'
  })
})