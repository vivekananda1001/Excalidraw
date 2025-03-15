import { WebSocket, WebSocketServer } from "ws";
import { WS_PORT } from "@repo/backend-common/config";
import jwt, { JwtPayload } from "jsonwebtoken";
import { USER_JWT_SECRET } from "./config";
import { prismaClient } from "@repo/db/client"

const wss = new WebSocketServer({port:WS_PORT});
// console.log(WS_PORT);

interface User {
    ws: WebSocket,
    rooms: Array<string>
    userId: string
}

const users:Array<User> = [];

function checkUser(token: string):string | null {
    const decoded = jwt.verify(token, USER_JWT_SECRET);

    if(typeof decoded == "string" || !decoded || !decoded.id){
        return null;
    }

    return decoded.id;
}

wss.on('connection', function connection( ws, request) {
    const url  = request.url;
    if(!url){
        return;
    }

    const queryParams = new URLSearchParams(url.split("?")[1]);
    const token = queryParams.get('token') || "";

    const userId = checkUser(token);
    if(!userId){
        ws.close();
        return null;
    }

    users.push({
        userId,
        rooms: [],
        ws
    })

    ws.on('message', async function message(data){
        const parsedData = JSON.parse(data as unknown as string);
        
        if(parsedData.type==="join_room"){
            try{
                const user = users.find(x => x.ws === ws);
                user?.rooms.push(parsedData.roomId);
            }catch(e){
                console.error("Could not join room. Please try again");
            }
        }

        if(parsedData.type==="leave_room"){
            try{
                const user = users.find(x => x.ws === ws);
                if(!user)return;
                user.rooms = user?.rooms.filter(x => x === parsedData.room);
            }catch(e){
                console.error("Could not leave room. Please try again");
            }
        }

        if(parsedData.type==="chat"){
            try{
                const roomId = parsedData.roomId;
                const message = parsedData.message;

                await prismaClient.chat.create({
                    data: {
                        RoomId: Number(roomId),
                        message,
                        userId
                    }
                })

                users.forEach(user => {
                    if(user.rooms.includes(roomId)){
                        user.ws.send(JSON.stringify({
                            type: "chat",
                            message: message,
                            roomId
                        }))
                    }  
                });
            }catch(e){
                console.error("Something went wrong. Please try again.")
            }
        }
    })
}); 