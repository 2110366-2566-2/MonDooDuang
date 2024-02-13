import ReportModal from "./components/ReportModal"
import ConversationSidebar from "./components/ConversationSidebar"
import ConversationBox from "./components/ConversationBox"
import { ConversationService } from "./services/ConversationService"
import { useEffect, useState } from "react"

const mockIsCustomer = true
const mockUserId = "3a1a96da-1cb0-4b06-bba5-5db0a9dbd4da"

export default function ConversationPage() {
  const [isShowReport, setIsShowReport] = useState(false)
  const [conversationIds, setConversationIds] = useState<string[]>([])
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null)
  useEffect(() => {
    const fetchConversations = async () => {
      const conversationIds = await ConversationService.getConversationsByUserId(mockUserId)
      setConversationIds(conversationIds)
      if (conversationIds.length > 0) setSelectedConversationId(conversationIds[0])
    }
    fetchConversations()
  }, [])

  const handleConversationSelect = (conversationId: string) => {
    setSelectedConversationId(conversationId)
  }

  const showReport = () => {
    setIsShowReport(true)
  }

  return (
    <div className="flex h-screen">
      <div className="w-1/4 bg-white bg-opacity-20">
        <ConversationSidebar
          conversationIds={conversationIds}
          onConversationSelect={handleConversationSelect}
          selectedConversationId={selectedConversationId}
        />
      </div>
      <div className="w-3/4 bg-black bg-opacity-40 border border-white">
        <ConversationBox conversationId={selectedConversationId} showReport={showReport} />
      </div>
      <ReportModal
        isShowReport={isShowReport}
        setIsShowReport={setIsShowReport}
        isCustomer={mockIsCustomer}
        userId={mockUserId}
        conversationId={selectedConversationId}
        isSystemReport={false}
      />
    </div>
  )
}
