import { Server } from "socket.io"
import { createServer } from "http"
import { Application } from "express"
import { conversationService } from "../services/conversation/conversation.services"

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
    conversationService.sendMessage(socket)
    conversationService.joinRoom(socket)
    conversationService.disconnect(socket)
  })

  return server
}
