import { Server } from "socket.io"
import { createServer } from "http"
import { Application } from "express"

export const io = new Server()

export const connectToSocket = (app: Application) => {
  const server = createServer(app)
  io.attach(server, {
    cors: {
      origin: "*"
    }
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

  return server
}
