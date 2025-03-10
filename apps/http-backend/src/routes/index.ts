import { Router } from "express";
import Authcontroller from "../controllers/Authcontroller";

const router = Router();

// Auth routes

router.post("/signup", Authcontroller.signup);
router.post("/login", Authcontroller.login);