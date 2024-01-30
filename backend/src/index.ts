import express, { Request, Response, Application } from "express"
import dotenv from "dotenv"
import exampleRouter from "./routes/example.routes"
import { createServer } from "http"
import { Server } from "socket.io"
import cors from "cors"

// For env File
dotenv.config()

const app: Application = express()
const port = process.env.PORT ?? 8000
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: "*"
  }
})

app.use(
  cors({
    origin: "*"
  })
)

app.get("/HelloWorld", (req: Request, res: Response) => {
  res.send("Hello World")
})

io.on("connection", (socket) => {
  console.log("New user connected")

  socket.on("sendMessage", (message) => {
    console.log(message)
    socket.broadcast.emit("receiveMessage", message)
  })

  socket.on("disconnect", () => {
    console.log("User disconnected")
  })
})

server.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`)
})

// implement route group here if no group needed
// please use app.use("/", someRouter) **not recommended**

app.use("/example", exampleRouter)

export default app
