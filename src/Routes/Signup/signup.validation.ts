import * as Joi from 'joi'
import validate from "../Services/validation.service";
const SingupSchema=Joi.object({
    fullname:Joi.string().min(3).max(100).required(),
    username:Joi.string().min(5).max(20).required(),
    password:Joi.string().min(6).max(50).required(),
    email:Joi.string().email().max(40).required(),
    gender:Joi.string().valid('Male','Female').required()
});
export default validate(SingupSchema);