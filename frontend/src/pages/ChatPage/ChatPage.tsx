import ChatSidebar from "./components/ChatSidebar"
import ChatBox from "./components/ChatBox"
import { ChatService } from "./services/ChatService"
import { useEffect, useState } from "react"

const mockUserId = "2da1baf4-4291-493b-b8d4-8a6c7d65d6b1"

export default function ChatPage() {
  const [conversationIds, setConversationIds] = useState<string[]>([""])
  useEffect(() => {
    const fetchConversations = async () => {
      const response = await ChatService.getConversationsByUserId(mockUserId)
      const conversationIds = await response.json()
      setConversationIds(conversationIds)
    }
    fetchConversations()
  }, [])

  // TODO
  // Receive all conversation related to this userId
  // Get lastest msg + Username of other person and show in sidebar
  // When click on sidebar -> Get all msg  + Joinroom
  return (
    <div className="flex h-screen">
      <div className="w-1/4 bg-gray-200">
        <ChatSidebar conversationIds={conversationIds} />
      </div>
      <div className="w-3/4 bg-gray-300">
        <ChatBox conversationId={conversationIds[conversationIds.length - 1]} />
      </div>
    </div>
  )
}
