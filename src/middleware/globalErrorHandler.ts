import type { NextFunction, Request, Response } from "express";
import { sendResponse } from "../module/utility/sendResponse";

const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {

    sendResponse(res, { status_code: 500, success: false, message: err.message, errors: err })
}

export default globalErrorHandler