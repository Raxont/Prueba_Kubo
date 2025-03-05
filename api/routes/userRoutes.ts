import {prisma} from "../infrastructure/database/prisma"
import { Router } from "express";

const UserRouter = Router();

UserRouter.get('/', (req,res)=>{
    try {
        res.send('Hello World');
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Error sending message to server '});
    }
});

export default UserRouter;