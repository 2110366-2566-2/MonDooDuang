import { environment } from "../../../common/constants/environment"

export const ConversationService = {
  createConversation: async (
    customerId: string, fortuneTellerId: string
  ) => {
    const res = await fetch(`${environment.backend.url}/conversations/create/${customerId}/${fortuneTellerId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await res.json()
    return { conversationId: data.data }
  },
}
