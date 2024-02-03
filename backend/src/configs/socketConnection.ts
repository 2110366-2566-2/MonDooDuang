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

    socket.on("sendMessage", (message: string, room: string) => {
      if (room === "") {
        socket.broadcast.emit("receiveMessage", message)
      } else {
        socket.to(room).emit("receiveMessage", message)
      }
      console.log(message)
    })

    socket.on("join-room", async (room: string) => {
      await socket.join(room)
    })

    socket.on("disconnect", () => {
      console.log("User disconnected")
    })
  })

  return server
}
