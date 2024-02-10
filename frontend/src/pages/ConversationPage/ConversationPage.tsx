import ReportModal from "./components/ReportModal"
import ConversationSidebar from "./components/ConversationSidebar"
import ConversationBox from "./components/ConversationBox"
import { ConversationService } from "./services/ConversationService"
import { useEffect, useState } from "react"

const mockUserId = "2da1baf4-4291-493b-b8d4-8a6c7d65d6b1"
const mockIsCustomer = true

export default function ConversationPage() {
  const [isShowReport, setIsShowReport] = useState(false)
  const [conversationIds, setConversationIds] = useState<string[]>([""])
  const [selectedConversationId, setSelectedConversationId] = useState<string>("")
  useEffect(() => {
    const fetchConversations = async () => {
      const response = await ConversationService.getConversationsByUserId(mockUserId)
      const conversationIds = await response.json()
      setConversationIds(conversationIds)
      setSelectedConversationId(conversationIds[0])
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
      {/* <button onClick={() => setIsShowReport(true)}>open</button> */}
      <ReportModal
        isShowReport={isShowReport}
        setIsShowReport={setIsShowReport}
        isCustomer={mockIsCustomer}
        userId={mockUserId}
        conversationId={selectedConversationId}
      />
    </div>
  )
}
