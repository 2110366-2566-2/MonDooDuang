import express, { Request, Response, Application } from "express"
import dotenv from "dotenv"
import paymentRouter from "./routes/payment.routes"
import reportRouter from "./routes/report.routes"
import searchRouter from "./routes/search.routes"

import conversationRouter from "./routes/conversation.routes"
import cors from "cors"
import { connectToSocket } from "./configs/socketConnection"
import { connectToDatabase } from "./configs/pgdbConnection"
import logger from "morgan"
import userRouter from "./routes/user.routes"
import cookieParser from "cookie-parser"

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

app.use(express.json())

app.use(logger("dev"))
app.use(cookieParser())

server.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`)
})

app.use("/user", userRouter)
app.use("/report", reportRouter)
app.use("/payment", paymentRouter)
app.use("/search", searchRouter)
app.use("/conversations", conversationRouter)

connectToDatabase().catch((error) => {
  console.error("Error connecting to the database:", error)
})

export default app
