import { Router } from "express";
import Authcontroller from "../controllers/Authcontroller";
import ChatRoomController from "../controllers/Chatroomcontroller";

const router = Router();

// Auth routes
router.post("/signup", Authcontroller.signup);
router.post("/login", Authcontroller.login);

// Room routes
router.get("/Create/:roomId",ChatRoomController.createRoom);