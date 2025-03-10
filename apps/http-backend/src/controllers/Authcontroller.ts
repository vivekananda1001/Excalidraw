import { Request, Response } from "express";
import { CreateUserSchema, user } from "@repo/common/common";
import jwt from "jsonwebtoken";

import { USER_JWT_SECRET } from "@repo/backend-common/config";

class Authcontroller {
    static async login(req: Request, res: Response){
        try {
            const body:user = req.body();
            const email = body.email;

            let JWTPayload = {
                name: body.name,
                email: email,
                // id: findUser.id
            }

            const token = jwt.sign( JWTPayload, USER_JWT_SECRET, {
                expiresIn: '365d'
            });;

            res.json({
                message: "Login Succesful!",
                user: {
                    // ...findUser,
                    token: token
                }
            })

        }
        catch(error){
            res.status(500).json({
                message: "Something went wrong. Please try again."
            })
        }
    }

    static async signup(req: Request, res: Response){
        try{
            const body: AuthUser = req.body;

            const data = CreateUserSchema.safeParse(body);
            if(!data.success){
                res.json({
                    message: "Incorrect credentials."
                });
                return;
            }

            res.json({
                message: "Signed in succesfully!"
            })
        }catch(error){
            res.status(500).json({
                message: "Something went wrong. Please try again."
            })
        }
    }
}

export default Authcontroller;