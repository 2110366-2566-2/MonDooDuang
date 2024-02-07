import express, { Request, Response, Application } from "express"
import dotenv from "dotenv"
import { connectToDatabase } from "./configs/pgdbConnnection"
import userRouter from "./routes/user.routes"

// For env File
dotenv.config()

const app: Application = express()
const port = process.env.PORT ?? 8000

// dont forget to delete this
app.get("/HelloWorld", (req: Request, res: Response) => {
  res.send("Hello World")
})

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`)
})

app.use(express.json())

app.use("/user", userRouter)

connectToDatabase().catch((error) => {
  console.error("Error connecting to the database:", error)
})

export default app
