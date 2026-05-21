import express, { type Application, type Request, type Response } from 'express'
import { authRouter } from './module/auth/auth.route'
import { issueRouter } from './module/issue/issue.route'
import globalErrorHandler from './middleware/globalErrorHandler'
import { sendResponse } from './module/utility/sendResponse'
export const app: Application = express()

app.use(express.json())

app.get('/', async (req: Request, res: Response) => {
    sendResponse(res, { status_code: 200, success: true, message: 'Hello World!' })
})

app.use('/api/auth', authRouter)

app.use('/api/issues', issueRouter)

// Global Error Handling Middleware
app.use(globalErrorHandler)

