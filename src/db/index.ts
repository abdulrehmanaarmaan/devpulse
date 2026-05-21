import { Pool } from 'pg'
import config from '../config'

export const pool = new Pool({
    connectionString: config.connection_string,
})

export const initDB = async () => {

    try {
        await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            role TEXT DEFAULT 'contributor' CHECK (role IN ('contributor', 'maintainer')),
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW())
            `)

        await pool.query(`
        CREATE TABLE IF NOT EXISTS issues(
        id SERIAL PRIMARY KEY,
        title VARCHAR(150) NOT NULL,
        description TEXT NOT NULL CHECK (length(description) >= 20),
        type TEXT CHECK (type IN ('bug', 'feature_request')),
        status TEXT DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved')),
        reporter_id INT UNIQUE REFERENCES users(id) ON DELETE CASCADE, 
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW())
        `)

        await pool.query(`
            CREATE OR REPLACE FUNCTION update_timestamp()
            RETURNS TRIGGER AS $$
            BEGIN
            NEW.updated_at = CURRENT_TIMESTAMP;
            RETURN NEW;
            END;
            $$ LANGUAGE plpgsql
        `)

        await pool.query(`
            DROP TRIGGER IF EXISTS issues_updated_at
            ON issues
        `)

        await pool.query(`
            CREATE TRIGGER issues_updated_at
            BEFORE UPDATE
            ON issues
            FOR EACH ROW
            EXECUTE FUNCTION update_timestamp()
        `)
        console.log('Database initialized')
    }
    catch (error) {
        console.log(error)
    }
}