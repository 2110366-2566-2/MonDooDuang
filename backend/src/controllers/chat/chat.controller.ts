import { Request, Response } from "express"
import { chatService } from "../../services/chat/chat.services"

const getConversationsByUserId = async (req: Request, res: Response) => {
  const userId = req.params.userId
  const conversations = await chatService.getConversationsByUserId(userId)
  res.send(conversations)
}

export const chatController = {
  getConversationsByUserId
}
