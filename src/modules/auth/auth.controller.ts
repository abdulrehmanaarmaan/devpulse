import type { Request, Response } from "express"
import { authService } from "./auth.service"

const { addUserToDB, verifyUserInDB } = authService

const addUser = async (req: Request, res: Response) => {

    try {
        const result = await addUserToDB(req.body)
        res.status(201).send({ success: true, message: 'User registered successfully', data: result })
    }
    catch (error) {
        res.status(500).send({ success: false, error: error })
    }
}

const verifyUser = async (req: Request, res: Response) => {

    try {
        const result = await verifyUserInDB(req.body)
        res.status(201).send({ success: true, message: 'Login successful', data: result })
    }
    catch (error: any) {
        res.status(500).send({ success: false, error: error.message })
    }
}

export const authController = {
    addUser,
    verifyUser
}