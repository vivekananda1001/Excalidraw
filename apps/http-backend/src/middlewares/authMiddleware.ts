import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"

import { USER_JWT_SECRET } from "../config"

const authMiddleware = (req: Request, res:Response, next: NextFunction) =>{
    try {
        const token = req.headers.authorization;
        if (!token) {
            res.status(401).json({ status: 401, message: "No token provided." });
            return;
        }

        const decoded = jwt.verify(token, USER_JWT_SECRET) as AuthUser;
        req.user = decoded; 
        next(); 
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
        return;
    }
};

export default authMiddleware;
