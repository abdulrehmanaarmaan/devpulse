import { Router } from "express";
import auth from "../../middleware/auth";
import { issueController } from "./issue.controller";
import checkRoleForUpdate from "../../middleware/checkRoleForUpdate";
import checkRoleForDelete from "../../middleware/checkRoleForDelete";

const router = Router()

const { addIssue, getIssues, getIssue, updateIssue, deleteIssue } = issueController

router.post('/', auth(), addIssue)

router.get('/', getIssues)

router.get('/:id', getIssue)

router.patch('/:id', auth(), checkRoleForUpdate(), updateIssue)

router.delete('/:id', auth(), checkRoleForDelete(), deleteIssue)

export const issueRouter = router