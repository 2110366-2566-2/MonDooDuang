import dotenv from "dotenv"
import { Client } from "pg"

dotenv.config()

const db = new Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  port: parseInt(process.env.PG_PORT ?? "5432"),
  password: process.env.PG_PASSWORD
})

const connectToDatabase = async () => {
  await db.connect()
}

export { connectToDatabase, db }
