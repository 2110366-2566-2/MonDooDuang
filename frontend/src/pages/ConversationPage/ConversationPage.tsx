import ReportModal from "./components/ReportModal"
import ConversationSidebar from "./components/ConversationSidebar"
import ConversationBox from "./components/ConversationBox"
import { useContext, useState } from "react"
import { AuthContext } from "../../common/providers/AuthProvider"

export default function ConversationPage() {
  const [isShowReport, setIsShowReport] = useState(false)
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null)
  const { userId, userType } = useContext(AuthContext)

  const handleConversationSelect = (conversationId: string) => {
    setSelectedConversationId(conversationId)
  }

  const showReport = () => {
    setIsShowReport(true)
  }

  return (
    <div className="flex h-screen">
      <div className="w-1/4">
        <ConversationSidebar
          onConversationSelect={handleConversationSelect}
          selectedConversationId={selectedConversationId}
          userId={userId}
        />
      </div>
      <div className="w-3/4 border-l-2 border-white">
        <ConversationBox
          conversationId={selectedConversationId}
          showReport={showReport}
          userId={userId}
        />
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
