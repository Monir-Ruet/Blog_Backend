import { model, Schema } from "mongoose";
import {LoginForm} from "./login.interface";

const LoginSchema=new Schema<LoginForm>({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const user=model<LoginForm>('user',LoginSchema);
export default user;