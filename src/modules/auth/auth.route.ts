import { Router } from "express";
import { authController } from "./auth.controller";

const router = Router()

const { addUser, verifyUser } = authController

router.post('/signup', addUser)

router.post('/login', verifyUser)

export const authRouter = router