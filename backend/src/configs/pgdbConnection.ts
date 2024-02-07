import { Client } from "pg"
import { environment } from "./environment"

const db = new Client({
  user: environment.pg.user,
  host: environment.pg.host,
  database: environment.pg.database,
  port: environment.pg.port,
  password: environment.pg.password
})

const connectToDatabase = async () => {
  await db.connect()
}

export { connectToDatabase, db }
