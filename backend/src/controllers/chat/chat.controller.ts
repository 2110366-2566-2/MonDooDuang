import { Request, Response } from "express"
import { chatService } from "../../services/chat/chat.services"

const getConversationsByUserId = async (req: Request, res: Response) => {
  const userId = req.params.userId
  const conversations = await chatService.getConversationsByUserId(userId)
  res.send(conversations)
}

const getNameWithLastMessage = async (req: Request, res: Response) => {
  const conversationId = req.params.conversationId
  const userId = req.params.userId
  const data = await chatService.getNameWithLastMessage(conversationId, userId)
  res.send(data)
}

export const chatController = {
  getConversationsByUserId,
  getNameWithLastMessage
}
