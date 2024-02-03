import { serviceConfig } from "../../../common/services/serviceConfig"

export const ChatService = {
  getConversationsByUserId: async (userId: string) => {
    return await fetch(`${serviceConfig.backendBaseUrl}/conversations/${userId}`)
  }
}
