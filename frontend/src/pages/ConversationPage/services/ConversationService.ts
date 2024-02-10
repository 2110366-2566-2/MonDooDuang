import { serviceConfig } from "../../../common/services/serviceConfig"

export const ConversationService = {
  getConversationsByUserId: async (userId: string) => {
    return await fetch(`${serviceConfig.backendBaseUrl}/conversations/${userId}`)
  },
  getNameWithLastMessage: async (conversationId: string, userId: string) => {
    return await fetch(
      `${serviceConfig.backendBaseUrl}/conversations/name-with-lastMessage/${conversationId}/${userId}`
    )
  },
  getMessagesByConversationId: async (conversationId: string, userId: string) => {
    return await fetch(
      `${serviceConfig.backendBaseUrl}/conversations/messages/${conversationId}/${userId}`
    )
  },
  getNameByConversationId: async (conversationId: string, userId: string) => {
    return await fetch(
      `${serviceConfig.backendBaseUrl}/conversations/name/${conversationId}/${userId}`
    )
  }
}
