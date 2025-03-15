import { Request, Response } from "express";
import { CreateUserSchema, user } from "@repo/common/common";
import jwt from "jsonwebtoken";
import { prismaClient } from "@repo/db/client"
import { USER_JWT_SECRET } from "../config";
import bcrypt from 'bcrypt';

interface ExtendedAuthUser extends AuthUser {
    name: string;
}

class Authcontroller {
    static async login(req: Request, res: Response){
        try {
            const body:user = req.body;
            const email = body.email;   

            let findUser = await prismaClient.user.findUnique({
                where: {
                    email: email,
                }
            })

            if(!findUser){
                res.status(401).json({
                    message: "Incorrect credentials!",
                })
                return;
            }

            const passwordMatch = await bcrypt.compare(
                body.password,
                findUser.password
            );

            if (!passwordMatch) {
                res.status(401).json({
                    message: "Incorrect password.",
                });
                return;
            }

            let JWTPayload = {
                name: body.name,
                email: email,
                id: findUser.id
            }

            let token = jwt.sign( JWTPayload, USER_JWT_SECRET, {
                expiresIn: '365d'
            });

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
            const hashedPassword = await bcrypt.hash(body.password,3);
            const data = CreateUserSchema.safeParse(body);
            if(!data.success){
                res.status(401).json({
                    message: "Incorrect credentials."
                });
                return;
            }
            body.password = hashedPassword;
            try{
                await prismaClient.user.create({
                    data:body
                })
                res.json({
                    message: "Signed up succesfully!"
                })
            }catch(error){
                res.status(411).json({
                    message: "A user with this email already exists in the data base."
                })
            }
        }catch(error){
            res.status(500).json({
                message: "Something went wrong. Please try again."
            })
        }
    }
}

export default Authcontroller;