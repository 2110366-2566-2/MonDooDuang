import ReportModal from "./components/ReportModal"

import ChatSidebar from "./components/ChatSidebar"
import ChatBox from "./components/ChatBox"
import { ChatService } from "./services/ChatService"
import { useEffect, useState } from "react"

const mockUserId = "2da1baf4-4291-493b-b8d4-8a6c7d65d6b1"

export default function ChatPage() {
  const [isShowReport, setIsShowReport] = useState(false)
  const [conversationIds, setConversationIds] = useState<string[]>([""])

  const mockUserId = "0b7cbf76-23f8-4a6a-8ac7-b7f13e3df07d"
  const mockConversationId = "2389b0b-6929-4b18-8a50-c301a36b3e24"

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
      <div className="w-1/4 bg-white bg-opacity-20">
        <ChatSidebar conversationIds={conversationIds} />
      </div>
      <div className="w-3/4 bg-black bg-opacity-40 border border-white">
        <ChatBox conversationId={conversationIds[conversationIds.length - 1]} />
      </div>
      <button onClick={() => setIsShowReport(true)}>open</button>
      <ReportModal
        isShowReport={isShowReport}
        setIsShowReport={setIsShowReport}
        userId={mockUserId}
        conversationId={mockConversationId}
      />
    </div>
  )
}
