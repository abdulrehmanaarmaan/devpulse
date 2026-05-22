import { Router } from "express";
import auth from "../../middleware/auth";
import { issueController } from "./issue.controller";
import updateIssueAuthorizer from "../../middleware/updateIssueAuthorizer";
import deleteIssueAuthorizer from "../../middleware/deleteIssueAuthorizer";

const router = Router()

const { addIssue, getIssues, getIssue, updateIssue, deleteIssue } = issueController

router.post('/', auth(), addIssue)

router.get('/', getIssues)

router.get('/:id', getIssue)

router.patch('/:id', auth(), updateIssueAuthorizer(), updateIssue)

router.delete('/:id', auth(), deleteIssueAuthorizer(), deleteIssue)

export const issueRouter = router