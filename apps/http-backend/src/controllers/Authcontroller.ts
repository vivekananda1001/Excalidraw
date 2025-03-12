import { Request, Response } from "express";
import { CreateUserSchema, user } from "@repo/common/common";
import jwt from "jsonwebtoken";
import { prismaClient } from "@repo/db/client"
import { USER_JWT_SECRET } from "@repo/backend-common/config";

interface ExtendedAuthUser extends AuthUser {
    name: string;
}

class Authcontroller {
    static async login(req: Request, res: Response){
        try {
            console.log(USER_JWT_SECRET);
            const body:user = req.body;
            const email = body.email;   

            // console.log(body);

            let findUser = await prismaClient.user.findUnique({
                where: {
                    email: email,
                    password: body.password
                }
            })

            if(!findUser){
                res.json({
                    message: "Incorrect credentials!",
                })
                return;
            }
            // console.log("Found user: ",findUser);
            let JWTPayload = {
                name: body.name,
                email: email,
                id: findUser.id
            }
            // console.log(JWTPayload);
            let token
            try{
                token = jwt.sign( JWTPayload, USER_JWT_SECRET, {
                    expiresIn: '365d'
                });
            }
            catch(err){
                console.log("Error while signing jwt.");
            }

            res.json({
                message: "Login Succesful!",
                user: {
                    id: findUser.id,
                    email: findUser.email,
                    name: findUser.name,
                    photo: findUser.photo,
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
            const body: ExtendedAuthUser = req.body;

            const data = CreateUserSchema.safeParse(body);
            if(!data.success){
                res.json({
                    message: "Incorrect credentials."
                });
                return;
            }
            await prismaClient.user.create({
                data:body
            })
            res.json({
                message: "Signed up succesfully!"
            })
        }catch(error){
            res.status(500).json({
                message: "Something went wrong. Please try again."
            })
        }
    }
}

export default Authcontroller;