import type { NextFunction, Request, Response } from "express"
import { sendResponse } from "../module/utility/sendResponse"

const deleteIssueAuthorizer = () => {

    return async (req: Request, res: Response, next: NextFunction) => {

        if (!req.user) {
            return sendResponse(res, { status_code: 401, success: false, message: 'Unauthorized access' })
        }

        const { role } = req.user

        if (role === 'contributor') {
            return sendResponse(res, { status_code: 403, success: false, message: 'Forbidden access' })
        }

        next()
    }
}

export default deleteIssueAuthorizer