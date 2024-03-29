import { environment } from "../../../common/constants/environment"

export const ConversationService = {
  getConversationsByUserId: async (userId: string, role: string) => {
    const response = await fetch(`${environment.backend.url}/conversations/${userId}/${role}`)
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
  },
  getUserTypeInConversation: async (conversationId: string, userId: string) => {
    const response = await fetch(
      `${environment.backend.url}/conversations/user-type-in-conversation/${conversationId}/${userId}`
    )
    const data = await response.json()

    // FORTUNE_TELLER by default
    if (!data.success) return "FORTUNE_TELLER"

    return data.userType
  },
  getProfilePicture: async (
    conversationId: string,
    userId: string,
    role: "CUSTOMER" | "FORTUNE_TELLER"
  ) => {
    const res = await fetch(
      `${environment.backend.url}/conversations/recieverUserId/${conversationId}/${userId}/${role}`
    )
    const recieverUserId = await res.json()
    const UserId = recieverUserId.recieverUserId
    const response = await fetch(`${environment.backend.url}/images/profile-picture/${UserId}`)
    const data = await response.json()
    if (!data.success) return null
    return data.data
  }
}
