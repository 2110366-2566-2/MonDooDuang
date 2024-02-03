import express, { Request, Response, Application } from "express"
import dotenv from "dotenv"
import exampleRouter from "./routes/example.routes"
import chatRouter from "./routes/chat.routes"
import cors from "cors"
import { connectToSocket } from "./configs/socketConnection"
import { connectToDatabase } from "./configs/pgdbConnnection"

// For env File
dotenv.config()

const app: Application = express()
const port = process.env.PORT ?? 8000
const server = connectToSocket(app)

app.use(
  cors({
    origin: "*"
  })
)

app.get("/HelloWorld", (req: Request, res: Response) => {
  res.send("Hello World")
})

server.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`)
})

// implement route group here if no group needed
// please use app.use("/", someRouter) **not recommended**

app.use("/example", exampleRouter)
app.use("/conversations", chatRouter)

connectToDatabase().catch((error) => {
  console.error("Error connecting to the database:", error)
})

export default app
