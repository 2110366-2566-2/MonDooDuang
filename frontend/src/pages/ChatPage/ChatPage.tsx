import ReportModal from "./components/ReportModal"
import { useState } from "react"

export default function ChatPage() {
  const [isShowReport, setIsShowReport] = useState(false)

  const mockIsCustomer = false
  const mockUserId = "3a1a96da-1cb0-4b06-bba5-5db0a9dbd4da"
  const mockConversationId = "3456a1c-4321-4b8c-9d0e-a6b2c3d4e5f6"

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
