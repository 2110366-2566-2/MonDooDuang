import ReportModal from "./components/ReportModal"
import ConversationSidebar from "./components/ConversationSidebar"
import ConversationBox from "./components/ConversationBox"
import { ConversationService } from "./services/ConversationService"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../common/providers/AuthProvider"
import { useParams } from "react-router-dom"

export default function ConversationPage() {
  const { cid } = useParams<{ cid: string }>()
  const [isShowReport, setIsShowReport] = useState(false)
  const [conversationIds, setConversationIds] = useState<string[]>([])
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(cid || null)
  const { userId, userType } = useContext(AuthContext)
  useEffect(() => {
    const fetchConversations = async () => {
      const conversationIds = await ConversationService.getConversationsByUserId(userId)
      setConversationIds(conversationIds)
      if (cid === undefined && conversationIds.length > 0) setSelectedConversationId(conversationIds[0])
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
          userId={userId}
        />
      </div>
      <div className="w-3/4 bg-black bg-opacity-40 border border-white">
        <ConversationBox conversationId={selectedConversationId} showReport={showReport} userId={userId}/>
      </div>
      <ReportModal
        isShowReport={isShowReport}
        setIsShowReport={setIsShowReport}
        isCustomer={userType === "CUSTOMER"}
        userId={userId}
        conversationId={selectedConversationId}
        isSystemReport={false}
      />
    </div>
  )
}
