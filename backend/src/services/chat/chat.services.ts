// get all conversation
// Connect db -> + Join room with conver id
// send message
// get all message
// get lastest msg + username

import { chatRepository } from "../../repositories/chat.repository"

export const chatService = {
  getConversationsByUserId: async (userId: string) => {
    const data = await chatRepository.getConversationsByUserId(userId)
    return data.map((conversation) => conversation.conversationid)
  }
}
