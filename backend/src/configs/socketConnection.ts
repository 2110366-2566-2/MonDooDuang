import { Server } from "socket.io"
import { createServer } from "http"
import { Application } from "express"
import { chatService } from "../services/chat/chat.services"

export const io = new Server()

export const connectToSocket = (app: Application) => {
  const server = createServer(app)
  io.attach(server, {
    cors: {
      origin: "*"
    }
  })

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id)
    chatService.sendMessage(socket)
    chatService.joinRoom(socket)
    chatService.disconnect(socket)
  })

  return server
}
