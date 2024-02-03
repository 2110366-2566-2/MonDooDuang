interface ChatFooterProps {
  messageText: string
  setMessageText: (message: string) => void
  sendMessage: () => void
}

export default function ChatFooter({ messageText, setMessageText, sendMessage }: ChatFooterProps) {
  return (
    <>
      <div className="input-box">
        <input
          type="text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </>
  )
}
