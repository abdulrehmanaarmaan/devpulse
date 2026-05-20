import type { Response } from "express";
import type { ResponseInfo } from "../types/responseInfo";

export const sendResponse = <X, Y>(res: Response, resInfo: ResponseInfo<X, Y>) => {

    const { status_code, success, message, data, error } = resInfo
    res.status(status_code).send({ success, message, data, error })
}