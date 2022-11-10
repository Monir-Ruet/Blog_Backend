import { model, Schema } from "mongoose";
import SignupForm from "./signup.interface";

const SignupSchema=new Schema<SignupForm>({
    fullname:{
        type:String,
        requires:true,
    },
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        enum:['Male','Female'],
        required:true
    }
})

const user=model<SignupForm>('user',SignupSchema);
export default user;