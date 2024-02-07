import express, { Request, Response, Application } from "express"
import dotenv from "dotenv"
import paymentRouter from "./routes/payment.routes"
import cors from "cors"
import reportRouter from "./routes/report.routes"
import { connectToDatabase } from "./configs/pgdbConnection"
import logger from "morgan"
import userRouter from "./routes/user.routes"

// For env File
dotenv.config()

const app: Application = express()
const port = process.env.PORT ?? 8000

app.use(express.json())
app.use(
  cors({
    origin: "*"
  })
)

app.use(logger("dev"))

app.use(express.json())
app.use(
  cors({
    origin: "*"
  })
)

app.use(logger("dev"))

// dont forget to delete this
app.get("/HelloWorld", (req: Request, res: Response) => {
  res.send("Hello World")
})

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`)
})

app.use(express.json())

app.use("/user", userRouter)
app.use("/report", reportRouter)
app.use("/payment", paymentRouter)

connectToDatabase().catch((error) => {
  console.error("Error connecting to the database:", error)
})

export default app
