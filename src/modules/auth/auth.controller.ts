import type { Request, Response } from "express"
import { authService } from "./auth.service"
import { sendResponse } from "../utility/sendResponse"

const { addUserToDB, verifyUserInDB } = authService

const addUser = async (req: Request, res: Response) => {

    try {
        const result = await addUserToDB(req.body)
        sendResponse(res, { status_code: 201, success: true, message: 'User registered successfully', data: result })
    }
    catch (error: any) {
        sendResponse(res, { status_code: 500, success: false, error: error.message })
    }
}

const verifyUser = async (req: Request, res: Response) => {

    try {
        const result = await verifyUserInDB(req.body)
        sendResponse(res, { status_code: 200, success: true, message: 'Login successful', data: result })
    }
    catch (error: any) {
        sendResponse(res, { status_code: 500, success: false, error: error.message })
    }
}

export const authController = {
    addUser,
    verifyUser
}