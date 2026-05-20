import express from 'express'
import { authRouter } from './modules/auth/auth.route'
export const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api/auth', authRouter)

