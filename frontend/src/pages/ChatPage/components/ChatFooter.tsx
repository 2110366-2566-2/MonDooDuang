import EventAvailableIcon from "@mui/icons-material/EventAvailable"
interface ChatFooterProps {
  messageText: string
  setMessageText: (message: string) => void
  sendMessage: () => void
}

export default function ChatFooter({ messageText, setMessageText, sendMessage }: ChatFooterProps) {
  return (
    <div className="w-[821px] h-[59px] bg-gray-300 p-4 flex justify-center items-center">
      <EventAvailableIcon />
      <input
        type="text"
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        placeholder="Type your message..."
        className="flex-grow p-2 border border-gray-400 rounded-md mr-2"
      />
      <button onClick={sendMessage} className="bg-blue-500 text-white px-4 py-2 rounded-md">
        Send
      </button>
    </div>
  )
}
