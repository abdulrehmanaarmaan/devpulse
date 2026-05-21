import { pool } from "../../db"
import type { FieldsToUpdate, Issue, Reporter } from "./issue.interface"

const addIssueToDB = async (issue: Issue, reporterId: number) => {

    try {

        const { title, description, type, reporter_id } = issue

        const result = await pool.query(`
            INSERT INTO issues(title, description, type, reporter_id)
            VALUES($1, $2, $3, COALESCE($4, ${reporterId}))
            RETURNING *`,
            [title, description, type, reporter_id])

        const addedIssue = result.rows[0]
        console.log(addedIssue)
        return addedIssue
    }
    catch (error: any) {
        throw new Error(error)
    }
}

const getIssuesFromDB = async (type: string, status: string) => {

    try {
        let sql = `
            SELECT *
            FROM issues
            WHERE 1=1
        `

        const values = []
        let index = 1

        if (type) {
            sql += ` AND type=$${index}`
            values.push(type)
            index++
        }

        if (status) {
            sql += ` AND status=$${index}`
            values.push(status)
            index++
        }

        const result = await pool.query(sql, values)

        const issues = result.rows

        const reporterIds = issues.map(issue => issue.reporter_id)

        const users = await pool.query(`
            SELECT id, name, role FROM users
            WHERE id = ANY($1)
            `, [reporterIds])

        const reporters = users.rows

        const finalData = issues.map(({ reporter_id, ...rest }) => ({ ...rest, reporter: reporters.find((reporter: Reporter) => reporter.id === reporter_id) }))

        return finalData
    }
    catch (error: any) {
        throw new Error(error)
    }
}

const getIssueFromDB = async (id: string) => {

    try {
        const result = await pool.query(`
            SELECT * FROM issues
            WHERE id = $1
        `,
            [id])

        const issue = result.rows[0]

        const users = await pool.query(`
            SELECT id, name, role FROM users
            WHERE id = $1
        `, [issue.reporter_id])

        const user = users.rows[0]
        console.log(users)

        const { reporter_id, ...rest } = issue

        const finalData = { ...rest, reporter: user }

        return finalData
    }
    catch (error: any) {
        throw new Error(error)
    }
}

const updateIssueInDB = async (fieldsToUpdate: FieldsToUpdate, id: string) => {

    try {
        const { title, description, type } = fieldsToUpdate

        const result = await pool.query(`
            UPDATE issues
            SET title=COALESCE($1, title),
            description=COALESCE($2, description),
            type=COALESCE($3, type)
            WHERE id=$4
            RETURNING *`,
            [title, description, type, id])

        return result.rows[0]
    }
    catch (error: any) {
        throw new Error(error)
    }
}

const deleteIssueFromDB = async (id: string) => {

    try {
        const result = await pool.query(`
            DELETE FROM issues
            WHERE id=$1
            RETURNING *
        `, [id])

        return result.rows[0]
    }
    catch (error: any) {
        throw new Error(error)
    }
}

export const issueService = {
    addIssueToDB,
    getIssuesFromDB,
    getIssueFromDB,
    updateIssueInDB,
    deleteIssueFromDB
}