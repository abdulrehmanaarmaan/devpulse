import { pool } from "../db"

const execute = (queryText: string, queryParams: unknown[] = []) => {
    return pool.query(queryText, queryParams)
}

export default execute