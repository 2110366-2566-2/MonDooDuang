import express, { Request, Response, Application } from "express"
import dotenv from "dotenv"
import exampleRouter from "./routes/example.routes"
import paymentRouter from "./routes/payment.routes"
import reportRouter from "./routes/report.routes"
import requestRouter from "./routes/request.routes"
import searchRouter from "./routes/search.routes"

import conversationRouter from "./routes/conversation.routes"
import cors from "cors"
import { connectToSocket } from "./configs/socketConnection"
import { connectToDatabase } from "./configs/pgdbConnection"
import logger from "morgan"
import packageRouter from "./routes/package.routes"
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

app.get("/HelloWorld", (req: Request, res: Response) => {
  res.send("Hello World")
})

server.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`)
})

// implement route group here if no group needed
// please use app.use("/", someRouter) **not recommended**

app.use("/example", exampleRouter)
app.use("/report", reportRouter)
app.use("/payment", paymentRouter)
app.use("/package",packageRouter)
app.use("/request", requestRouter)
app.use("/search", searchRouter)
app.use("/conversations", conversationRouter)

connectToDatabase().catch((error) => {
  console.error("Error connecting to the database:", error)
})

export default app
