import App from "./app";
import Controller from "@/Interfaces/controller.interface";
import 'module-alias/register'
import 'dotenv/config'
import Login from "@/Routes/Login/login.controller";
import Singup from "@/Routes/Signup/signup.controllers";
import Profile from "@/Routes/Profile/profile.controller";
import Post from "@/Routes/Post/post.controller";
import Compiler from "./Routes/Compiler/compiler.controller";

const controller:Controller[]=[new Singup,new Login,new Profile,new Post,new Compiler]
const app=new App(controller,Number(process.env.PORT));

app.listen();