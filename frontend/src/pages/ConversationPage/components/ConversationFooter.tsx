import EventAvailableIcon from "@mui/icons-material/EventAvailable"
import SendIcon from "@mui/icons-material/Send"
interface ConversationFooterProps {
  messageText: string
  setMessageText: (message: string) => void
  sendMessage: () => void
}

export default function ConversationFooter({
  messageText,
  setMessageText,
  sendMessage
}: ConversationFooterProps) {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      sendMessage()
    }
  }

  return (
    <div className="h-[59px] bg-gray-300 p-4 flex justify-center items-center">
      <EventAvailableIcon fontSize="large" />
      <div className="flex ml-2">
        <input
          type="text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="พิมพ์ข้อความ"
          className="p-2 bg-gray-100 rounded-l-lg w-[821px]"
        />
        <button onClick={sendMessage} className="p-2 bg-gray-100 rounded-r-lg">
          <SendIcon />
        </button>
      </div>
    </div>
  )
}
