import Controller from "@/Interfaces/controller.interface";
import { NextFunction, Router,Request,Response } from "express";
import {Add,Fetch,Edit} from './post.validation';
import post from "./post.model";
import HttpException from "@/Resources/httpexception";
import { IEdit } from "./post.interface";

class Post implements Controller{
    path: string;
    router: Router;
    constructor(){
        this.path='posts',
        this.router=Router();
        this.initializeRouter();
    }
    private initializeRouter(){
        this.router.post('/add',Add,async(req:Request,res:Response,next:NextFunction)=>{
            console.log(req.body);
            try{
                const newPost=new post(req.body);
                await newPost.save();
                next(new HttpException(200,'New post added successfully'));
            }
            catch(err){
                next(new HttpException(400,'Unable to add new Item'));
            }
        })
        this.router.post('/view',Fetch,async(req:Request,res:Response,next:NextFunction)=>{
            console.log(req.body);
            try{
                let result=await post.findOne(req.body);
                if(result) {
                    await post.updateOne(req.body,{$inc:{count:+1}});
                    result.count++;
                    return res.send(result);
                }
                else throw new Error();
            }
            catch(err){
                next(new HttpException(400,'There is no post with this id.'));
            }
        })
        this.router.post('/edit',Edit,async(req:Request,res:Response,next:NextFunction)=>{
            try{
                let data:IEdit=<IEdit>req.body;
                let toEdit=await post.updateOne({_id:data._id},req.body);
                if(toEdit) return next(new HttpException(200,'Information updated successfully.'));
                else return next(new HttpException(400,'There is no post with this id.'));
            }
            catch(err){
                next(err);
            }
        })

        this.router.delete('/delete',Fetch,async(req:Request,res:Response,next:NextFunction)=>{
            try{
                let f=await post.deleteOne(req.body);
                if(f.deletedCount) return next(new HttpException(200,'Post deleted successfully'));
                else throw new Error();
            }catch(err){
                next(new HttpException(400,'There is no post with this id.'));
            }
        })
        this.router.post('/like',Fetch,async(req:Request,res:Response,next:NextFunction)=>{
            try{
                let f=await post.updateOne(req.body,{$inc:{like:1}});
                if(f.modifiedCount) next(new HttpException(200,'Liked'));
                else throw new Error();
            }catch(err){
                next(new HttpException(400,'There is no post with this id.'));
            }
        })
        this.router.post('/dislike',Fetch,async(req:Request,res:Response,next:NextFunction)=>{
            try{
                let f=await post.updateOne(req.body,{$inc:{dislike:1}});
                if(f.modifiedCount) next(new HttpException(200,'Disliked'));
                else throw new Error();
            }catch(err){
                next(new HttpException(400,'There is no post with this id.'));
            }
        })
    }
}

export default Post;
