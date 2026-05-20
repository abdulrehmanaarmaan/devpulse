import config from "../../config";
import { pool } from "../../db";
import type { User, UserToVerify } from "./auth.interface";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const addUserToDB = async (user: User) => {

    try {
        const { name, email, password, role } = user

        const hashedPassword = await bcrypt.hash(password, 10)

        const result = await pool.query(`
        INSERT INTO users(name, email, password, role)
        VALUES($1, $2, $3, COALESCE($4, 'contributor'))
        RETURNING *`,
            [name, email, hashedPassword, role])

        const registeredUser = result.rows[0]

        delete registeredUser.password

        return registeredUser
    }
    catch (error: any) {
        throw new Error(error)
    }
}

const verifyUserInDB = async (userToVerify: UserToVerify) => {

    const { email, password } = userToVerify

    const result = await pool.query(`
        SELECT * FROM users
        WHERE email=$1
        `, [email])

    if (!result.rowCount) {
        throw new Error('User not found')
    }

    const user = result.rows[0]

    const isSamePassword = await bcrypt.compare(password, user.password)

    if (!isSamePassword) {
        throw new Error('Invalid password')
    }

    const { id, name, role } = user

    const jwtPayload = {
        id,
        name,
        role
    }

    const token = jwt.sign(jwtPayload, config.jwt_secret as string, { expiresIn: '1d' })

    delete user.password

    return { token, user }
}

export const authService = {
    addUserToDB,
    verifyUserInDB
}