import Controller from "@/Interfaces/controller.interface";
import { Router,Request,Response,NextFunction } from "express";
import signupValidation from "./signup.validation";
import user from "./signup.model";
import HttpException from "@/Resources/httpexception";
import {Encrypt} from '@/Routes/Services/encryption.bcrypt';
import bcrypt from 'bcrypt';


class Singup implements Controller{
    path: string;
    router: Router;
    constructor(){
        this.path='signup';
        this.router=Router();
        this.initializeRouter();
    }
    private initializeRouter(){
        this.router.post('/',signupValidation,async(req:Request,res:Response,next:NextFunction)=>{
            const existUser=await user.findOne({$or:[{username:req.body.username},{email:req.body.email}]});
            if(!existUser){
                try{
                    req.body.password=await Encrypt(req.body.password);
                    const NewUser=new user(req.body);
                    NewUser.save();
                    next(new HttpException(200,'Account created successfully'));
                    return;
                }
                catch(err){
                    next(err);
                }
            }else{
                next(new HttpException(400,'There is an account with this username / email'));
            }
        })
    }
}
export default Singup;