import Controller from "@/Interfaces/controller.interface";
import { Router,Request,Response,NextFunction } from "express";
import user from "@/Routes/Signup/signup.model";
import bcrypt from 'bcrypt';
import ValidateLogin from './login.validation';
import HttpException from "@/Resources/httpexception";
import {GenerateToken} from '@/Routes/Services/authentication.service';

class Login implements Controller{
    path: string;
    router: Router;
    constructor(){
        this.path='login';
        this.router=Router();
        this.initializeRouter();
    }
    private initializeRouter(){
        
        this.router.post('/',ValidateLogin,async(req:Request,res:Response,next:NextFunction)=>{
            const LoginUser=await user.findOne({$or:[{username:req.body.username},{email:req.body.email}]});
            if(LoginUser){
                const f=await bcrypt.compare(req.body.password,LoginUser.password);
                if(f) return res.send({
                    status:200,
                    token:GenerateToken({username:req.body.username})
                })
                else return next(new HttpException(400,'Incorrect password'));
            }else{
                next(new HttpException(404,'There is no account with this information'));
            }
        })

        this.router.all('/',(req:Request,res:Response,next:NextFunction)=>{
            res.send('NONE');
        })
    }

}
export = Login;