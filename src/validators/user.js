import Joi from "joi";

const userSchema = Joi.object({
    first_name: Joi.string().min(1).required(),
    last_name: Joi.string().min(1).required(),
    email: Joi.string().email().required(),
    job_title: Joi.string().required(),
    star: Joi.boolean().required(),
});

export default userSchema;