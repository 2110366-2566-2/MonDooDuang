import ReportModal from "./components/ReportModal"
import ConversationSidebar from "./components/ConversationSidebar"
import ConversationBox from "./components/ConversationBox"
import NavBar from "../../common/components/NavBar/NavBar"
import { useContext, useState } from "react"
import { AuthContext } from "../../common/providers/AuthProvider"
import { ConversationService } from "./services/ConversationService"

export default function ConversationPage() {
  const [isShowReport, setIsShowReport] = useState(false)
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null)
  const { userId, userType, username } = useContext(AuthContext)
  const [isSystemReport, setIsSystemReport] = useState(false)
  const [selectedUserType, setSelectedUserType] = useState<"CUSTOMER" | "FORTUNE_TELLER">(
    "FORTUNE_TELLER"
  )

  const handleConversationSelect = async (conversationId: string) => {
    setSelectedConversationId(conversationId)

    const userTypeInConversation = await ConversationService.getUserTypeInConversation(
      conversationId,
      userId
    )
    setSelectedUserType(userTypeInConversation)
    console.log(userTypeInConversation)
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
        userId={userId}
      />
      <div className="flex h-screen">
        <div className="w-1/4">
          <ConversationSidebar
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
            userType={selectedUserType}
          />
        </div>
        <ReportModal
          isShowReport={isShowReport}
          setIsShowReport={setIsShowReport}
          isCustomer={selectedUserType === "CUSTOMER"}
          userId={userId}
          conversationId={selectedConversationId}
          isSystemReport={isSystemReport}
        />
      </div>
    </>
  )
}
