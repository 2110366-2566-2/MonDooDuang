import express, { Request, Response, Application } from "express"
import exampleRouter from "./routes/example.routes"
import paymentRouter from "./routes/payment.routes"
import reportRouter from "./routes/report.routes"
import requestRouter from "./routes/request.routes"
import searchRouter from "./routes/search.routes"
import fortuneTellerRouter from "./routes/fortuneTeller.routes"
import notificationRouter from "./routes/notification.routes"
import conversationRouter from "./routes/conversation.routes"
import appointmentRouter from "./routes/appointment.routes"
import s3Router from "./routes/s3.routes"
import reviewRouter from "./routes/review.routes"
import cors from "cors"
import { connectToSocket } from "./configs/socketConnection"
import { connectToDatabase } from "./configs/pgdbConnection"
import logger from "morgan"
import userRouter from "./routes/user.routes"
import adminRouter from "./routes/admin.routes"
import timetableRouter from "./routes/timetable.routes"
import { environment } from "./configs/environment"

const app: Application = express()
const port = environment.server.port
const server = connectToSocket(app)

app.use(
  cors({
    origin: "*"
  })
)

app.use(express.json())

app.use(logger("dev"))

server.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`)
})

app.use("/example", exampleRouter)
app.use("/user", userRouter)
app.use("/report", reportRouter)
app.use("/payment", paymentRouter)
app.use("/appointment", appointmentRouter)
app.use("/request", requestRouter)
app.use("/search", searchRouter)
app.use("/conversations", conversationRouter)
app.use("/fortuneteller", fortuneTellerRouter)
app.use("/images", s3Router)
app.use("/admin", adminRouter)
app.use("/review", reviewRouter)
app.use("/notification", notificationRouter)
app.use("/timetable", timetableRouter)

connectToDatabase().catch((error) => {
  console.error("Error connecting to the database:", error)
})

export default app
