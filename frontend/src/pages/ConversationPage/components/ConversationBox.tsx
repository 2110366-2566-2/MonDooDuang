import MessageList from "./MessageList"
import ConversationFooter from "./ConversationFooter"
import ConversationHeader from "./ConversationHeader"
import { MessageInformation } from "../types/MessageInformation"

export default function ConversationBox({
  conversationId,
  showReport,
  systemReport,
  userType,
  name,
  messages,
  messageText,
  setMessageText,
  sendMessage
}: {
  conversationId: string | null
  showReport: () => void
  systemReport: (selectReportMode: boolean) => void
  userType: "CUSTOMER" | "FORTUNE_TELLER" | "ADMIN"
  name: string
  messages: MessageInformation[]
  messageText: string
  setMessageText: (message: string) => void
  sendMessage: () => void
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <ConversationHeader
        name={name}
        showReport={showReport}
        systemReport={systemReport}
        conversationId={conversationId}
        userType={userType}
      />
      <MessageList messages={messages} />
      <div className="mt-auto">
        <ConversationFooter
          messageText={messageText}
          setMessageText={setMessageText}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  )
}
