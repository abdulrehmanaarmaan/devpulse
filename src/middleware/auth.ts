import type { NextFunction, Request, Response } from "express";
import { sendResponse } from "../module/utility/sendResponse";
import jwt, { type JwtPayload } from 'jsonwebtoken'
import config from "../config";
import execute from "../reusable_function/execute";

const auth = () => {

    return async (req: Request, res: Response, next: NextFunction) => {
        try {

            const token = req.headers.authorization

            if (!token) {
                return sendResponse(res, { status_code: 401, success: false, message: 'Unauthorized access' })
            }

            const verifiedUser = jwt.verify(token as string, config.jwt_secret as string) as JwtPayload

            if (!verifiedUser) {
                sendResponse(res, { status_code: 401, success: false, message: 'Invalid token' })
            }

            const result = await execute(`
                SELECT * FROM users
                WHERE id=$1
            `, [verifiedUser.id])

            if (!result.rowCount) {
                return sendResponse(res, { status_code: 404, success: false, message: 'User not found' })
            }

            req.user = verifiedUser

            next()
        }
        catch (error) {
            next(error)
        }
    }
}


export default auth