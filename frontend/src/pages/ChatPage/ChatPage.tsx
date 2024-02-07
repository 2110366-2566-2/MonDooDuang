import ReportModal from "./components/ReportModal"
import { useState } from "react"

export default function ChatPage() {
  const [isShowReport, setIsShowReport] = useState(false)

  const mockIsCustomer = false
  const mockUserId = "0b7cbf76-23f8-4a6a-8ac7-b7f13e3df07d"
  const mockConversationId = "2389b0b-6929-4b18-8a50-c301a36b3e24"

  return (
    <div>
      <h1>Chat Page</h1>
      <button onClick={() => setIsShowReport(true)}>open</button>
      <ReportModal
        isShowReport={isShowReport}
        setIsShowReport={setIsShowReport}
        isCustomer={mockIsCustomer}
        userId={mockUserId}
        conversationId={mockConversationId}
      />
    </div>
  )
}
