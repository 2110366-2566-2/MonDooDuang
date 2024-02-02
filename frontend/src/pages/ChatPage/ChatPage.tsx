import ReportModal from "./components/ReportModal"
import { useState } from "react"

export default function ChatPage() {
  const [isShowReport, setIsShowReport] = useState(false)

  return (
    <div>
      <h1>Chat Page</h1>
      <button onClick={() => setIsShowReport(true)}>open</button>
      <ReportModal isShowReport={isShowReport} setIsShowReport={setIsShowReport} />
    </div>
  )
}
