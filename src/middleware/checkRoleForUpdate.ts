import type { NextFunction, Request, Response } from "express"
import { pool } from "../db"
import { sendResponse } from "../module/utility/sendResponse"

const checkRoleForUpdate = () => {

    return async (req: Request, res: Response, next: NextFunction) => {

        try {

            if (!req.user) {
                return sendResponse(res, { status_code: 401, success: false, message: 'Unauthorized access' })
            }

            const { role, id: requestorId } = req.user

            if (role === 'maintainer') {
                return next()
            }

            const { id } = req.params

            const result = await pool.query(`
                    SELECT reporter_id, status FROM issues
                    WHERE id=$1
                `, [id])

            if (!result.rowCount) {
                return sendResponse(res, { status_code: 404, success: false, message: 'Issue not found' })
            }

            const issue = result.rows[0]

            const { reporter_id, status } = issue

            if (requestorId !== reporter_id) {
                return sendResponse(res, { status_code: 403, success: false, message: 'Forbidden access' })
            }

            if (status !== 'open') {
                return sendResponse(res, { status_code: 403, success: false, message: 'Issue is not open currently' })
            }

            next()
        }
        catch (error) {
            next(error)
        }
    }
}

export default checkRoleForUpdate