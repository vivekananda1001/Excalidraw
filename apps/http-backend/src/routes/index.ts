import { Router } from "express"
import Authcontroller from "../controllers/Authcontroller";
import RoomController from "../controllers/Chatroomcontroller";

const router:Router = Router();

// Auth routes
router.post("/signup", Authcontroller.signup);
router.post("/login", Authcontroller.login);

// Room routes
router.get("/Create/:roomId",RoomController.createRoom);

export default router;
