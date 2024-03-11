import { environment } from "../../../common/constants/environment"

export const ConversationService = {
  getConversationsByUserId: async (userId: string) => {
    const response = await fetch(`${environment.backend.url}/conversations/${userId}`)
    return await response.json()
  },
  getNameWithLastMessage: async (conversationId: string, userId: string) => {
    const response = await fetch(
      `${environment.backend.url}/conversations/name-with-lastMessage/${conversationId}/${userId}`
    )
    return await response.json()
  },
  getMessagesByConversationId: async (conversationId: string | null, userId: string) => {
    const response = await fetch(
      `${environment.backend.url}/conversations/messages/${conversationId}/${userId}`
    )
    return await response.json()
  },
  getNameByConversationId: async (conversationId: string, userId: string) => {
    const response = await fetch(
      `${environment.backend.url}/conversations/name/${conversationId}/${userId}`
    )
    return await response.json()
  },
  getUnreadMessagesConversationId: async (conversationId: string, userId: string) => {
    const response = await fetch(
      `${environment.backend.url}/conversations/unread-messages/${conversationId}/${userId}`
    )
    return await response.json()
  }
}
