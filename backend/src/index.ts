import express, { Request, Response, Application } from "express"
import dotenv from "dotenv"
import paymentRouter from "./routes/payment.routes"
import reportRouter from "./routes/report.routes"
import requestRouter from "./routes/request.routes"
import searchRouter from "./routes/search.routes"
import fortuneTellerRouter from "./routes/fortuneTeller.routes"
import conversationRouter from "./routes/conversation.routes"
import appointmentRouter from "./routes/appointment.routes"
import reviewRouter from "./routes/review.routes"
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
app.use("/appointment", appointmentRouter)
app.use("/request", requestRouter)
app.use("/search", searchRouter)
app.use("/conversations", conversationRouter)
app.use("/fortuneteller", fortuneTellerRouter)
app.use("/review", reviewRouter)

connectToDatabase().catch((error) => {
  console.error("Error connecting to the database:", error)
})

export default app
