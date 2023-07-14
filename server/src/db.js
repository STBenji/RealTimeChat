import { createPool } from 'mysql2/promise'

export const pool = createPool({
    host : 'localhost',
    database : 'chatvibe',
    user : 'root',
    password : 'Stigmata14/',
    port: 3306,
})