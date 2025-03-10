import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"

import { USER_JWT_SECRET } from "@repo/backend-common/config";

export const authMiddleware = (req: Request, res:Response, next: NextFunction)=>{
    const token = req.headers.authorization;
    if(token===null || token===undefined){
        return res.status(401).json({status: 401, message: "No token provided."});
    }

    jwt.verify(token, USER_JWT_SECRET,(err, user)=>{
        if(err)return res.status(401).json({message:"Invalid token"});
        req.user = user as AuthUser;
        next();
    });
}