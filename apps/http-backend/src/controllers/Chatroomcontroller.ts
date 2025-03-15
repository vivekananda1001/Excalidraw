import { CreateRoomSchema, room } from "@repo/common/common";
import { prismaClient } from "@repo/db/client";
import { Request, Response } from "express";


class RoomController {
    static async createRoom (req: Request, res: Response) {
        const parsedData = CreateRoomSchema.safeParse(req.body);
        
        if(!parsedData.success){
            res.status(401).json({
                message: "Incorrect input."
            });
            return;
        }

        const userId = req.body.userId!;
        if(!userId || userId===undefined){
            res.status(401).json({
                message: "userId not provided."
            })
            return;
        }

        let findroom = await prismaClient.room.findMany({
            where: {
                slug: parsedData.data.name
            }
        });

        if(!findroom || findroom.length==0){
            const roomdata = await prismaClient.room.create({
                data: {
                    slug: parsedData.data.name,
                    adminId: userId
                }
            });
    
            res.json({
                message: "Room Created Succesfully!",
                roomId: roomdata.id
            })    
            return;        
        }
        
        res.status(411).json({
            message: "A room with same name already exists!"
        })
    }   
    static async visitRoom(req: Request, res:Response){
        const roomId = Number(req.params.roomId);
        const messages = await prismaClient.room.findMany({
            where:{
                id: roomId
            },
            orderBy: {
                id: "desc"
            },
            take: 50
        })

        res.json({
            messages
        })
    }
}

export default RoomController;