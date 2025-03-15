import { Router } from "express"
import Authcontroller from "../controllers/Authcontroller";
import RoomController from "../controllers/Chatroomcontroller";
import authMiddleware from "../middlewares/authMiddleware";

const router:Router = Router();

// Auth routes
router.post("/signup", Authcontroller.signup);
router.post("/login", Authcontroller.login);

// Room routes
router.post("/create", authMiddleware, RoomController.createRoom);
router.get("/chats/:roomId", authMiddleware, RoomController.visitRoom);

export default router;
