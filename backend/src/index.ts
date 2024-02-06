import express, { Request, Response, Application } from "express"
import dotenv from "dotenv"
import exampleRouter from "./routes/example.routes"
import paymentRouter from "./routes/payment.routes"
import cors from "cors"
import reportRouter from "./routes/report.routes"
import { connectToDatabase } from "./configs/pgdbConnection"
import logger from "morgan"

// For env File
dotenv.config()

const app: Application = express()
const port = process.env.PORT ?? 8000

app.get("/HelloWorld", (req: Request, res: Response) => {
  res.send("Hello World")
})

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`)
})

// implement route group here if no group needed
// please use app.use("/", someRouter) **not recommended**

app.use("/example", exampleRouter)

connectToDatabase().catch((error) => {
  console.error("Error connecting to the database:", error)
})

export default app
