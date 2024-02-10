import { Request, Response } from "express"
import { conversationService } from "../../services/conversation/conversation.services"

const getConversationsByUserId = async (req: Request, res: Response) => {
  const userId = req.params.userId
  const conversations = await conversationService.getConversationsByUserId(userId)
  res.send(conversations)
}

const getNameWithLastMessage = async (req: Request, res: Response) => {
  const conversationId = req.params.conversationId
  const userId = req.params.userId
  const data = await conversationService.getNameWithLastMessage(conversationId, userId)
  res.send(data)
}

const getMessagesByConversationId = async (req: Request, res: Response) => {
  const conversationId = req.params.conversationId
  const userId = req.params.userId
  const data = await conversationService.getMessagesByConversationId(conversationId, userId)
  res.send(data)
}

const getNameByConversationId = async (req: Request, res: Response) => {
  const conversationId = req.params.conversationId
  const userId = req.params.userId
  const data = await conversationService.getNameByConversationId(conversationId, userId)
  res.send(data)
}

export const conversationController = {
  getConversationsByUserId,
  getNameWithLastMessage,
  getMessagesByConversationId,
  getNameByConversationId
}
