import type { Request, Response } from "express"
import { sendResponse } from "../utility/sendResponse"
import { issueService } from "./issue.service"

const { addIssueToDB, getIssuesFromDB, getIssueFromDB, updateIssueInDB, deleteIssueFromDB } = issueService

const addIssue = async (req: Request, res: Response) => {

    try {
        const issue = req.body
        const reporterId = req.user.id
        const result = await addIssueToDB(issue, reporterId)
        sendResponse(res, { status_code: 201, success: true, message: 'Issue created successfully', data: result })
    }
    catch (error: any) {
        sendResponse(res, { status_code: 500, success: false, message: error.message, errors: error })
    }
}

const getIssues = async (req: Request, res: Response) => {

    try {
        const { type, status, sort } = req.query
        const result = await getIssuesFromDB(type as string, status as string, sort as string)

        if (!result.length) {
            sendResponse(res, { status_code: 404, success: false, message: 'No issue added' })
        }
        sendResponse(res, { status_code: 200, success: true, data: result })
    }
    catch (error: any) {
        sendResponse(res, { status_code: 500, success: false, message: error.message, errors: error })
    }
}

const getIssue = async (req: Request, res: Response) => {

    try {
        const { id } = req.params
        const result = await getIssueFromDB(id as string)

        if (!result) {
            return sendResponse(res, { status_code: 404, success: false, message: 'Issue not found' })
        }
        sendResponse(res, { status_code: 200, success: true, data: result })
    }
    catch (error: any) {
        sendResponse(res, { status_code: 500, success: false, message: error.message, errors: error })
    }
}

const updateIssue = async (req: Request, res: Response) => {

    try {
        const { id } = req.params
        const result = await updateIssueInDB(req.body, id as string)

        if (!result) {
            return sendResponse(res, { status_code: 404, success: false, message: 'Issue not found' })
        }
        sendResponse(res, { status_code: 200, success: true, message: 'Issue updated successfully', data: result })
    }
    catch (error: any) {
        sendResponse(res, { status_code: 500, success: false, message: error.message, errors: error })
    }
}

const deleteIssue = async (req: Request, res: Response) => {

    try {
        const { id } = req.params
        const result = await deleteIssueFromDB(id as string)

        if (!result) {
            return sendResponse(res, { status_code: 404, success: false, message: 'Issue not found' })
        }
        sendResponse(res, { status_code: 200, success: true, message: 'Issue deleted successfully' })
    }
    catch (error: any) {
        sendResponse(res, { status_code: 500, success: false, message: error.message, errors: error })
    }
}

export const issueController = {
    addIssue,
    getIssues,
    getIssue,
    updateIssue,
    deleteIssue
}