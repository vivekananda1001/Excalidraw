import { Request, Response } from "express";
import { user } from "@repo/types/types";
import jwt from "jsonwebtoken";

import { USER_JWT_SECRET } from "../config";

class Authcontroller {
    static async login(req: Request, res: Response){
        try {
            const body:user = req.body();
            const userId = body.Id;

            const token = jwt.sign({userId},USER_JWT_SECRET);

            res.json({
                message: "Login Succesful!",
                token: token
            })

        }
        catch(error){
            res.status(500).json({
                message: "Something went wrong. Please try again."
            })
        }
    }

    static async signup(req: Request, res: Response){

    }

    static async createRoom(req: Request, res:Response){
        
    }
}

export default Authcontroller;