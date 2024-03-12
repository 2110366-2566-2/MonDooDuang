import ReportModal from "./components/ReportModal"
import ConversationSidebar from "./components/ConversationSidebar"
import ConversationBox from "./components/ConversationBox"
import NavBar from "../../common/components/NavBar/NavBar"
import { ConversationService } from "./services/ConversationService"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../common/providers/AuthProvider"

export default function ConversationPage() {
  const [isShowReport, setIsShowReport] = useState(false)
  const [conversationIds, setConversationIds] = useState<string[]>([])
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null)
  const { userId, userType, username } = useContext(AuthContext)
  const [isSystemReport, setIsSystemReport] = useState(false)

  useEffect(() => {
    const fetchConversations = async () => {
      const conversationIds = await ConversationService.getConversationsByUserId(userId)
      setConversationIds(conversationIds)
    }
    fetchConversations()
  }, [])

  const handleConversationSelect = (conversationId: string) => {
    setSelectedConversationId(conversationId)
  }

  const showReport = () => {
    setIsShowReport(true)
  }

  const systemReport = (selectReportMode: boolean) => {
    setIsSystemReport(selectReportMode)
  }

  return (
    <>
      <NavBar
        isFortuneTeller={userType === "FORTUNE_TELLER"}
        menuFocus={"conversation"}
        username={username}
      />
      <div className="flex h-screen">
        <div className="w-1/4">
          <ConversationSidebar
            conversationIds={conversationIds}
            onConversationSelect={handleConversationSelect}
            selectedConversationId={selectedConversationId}
            userId={userId}
          />
        </div>
        <div className="w-3/4 bg-black bg-opacity-40 border border-white">
          <ConversationBox
            conversationId={selectedConversationId}
            showReport={showReport}
            systemReport={systemReport}
            userId={userId}
          />
        </div>
        <ReportModal
          isShowReport={isShowReport}
          setIsShowReport={setIsShowReport}
          isCustomer={userType === "CUSTOMER"}
          userId={userId}
          conversationId={selectedConversationId}
          isSystemReport={isSystemReport}
        />
      </div>
    </>
  )
}
