import { useState, useEffect } from "react"
import { ChatService } from "../services/ChatService"

interface ChatListProps {
  conversationId: string
}

const mockUserId = "2da1baf4-4291-493b-b8d4-8a6c7d65d6b1"

export default function ChatList({ conversationId }: ChatListProps) {
  const [name, setName] = useState<string>("")
  const [lastMessage, setLastMessage] = useState<string>("")
  useEffect(() => {
    const fetchNameWithLastMessage = async () => {
      if (conversationId && mockUserId) {
        const response = await ChatService.getNameWithLastMessage(conversationId, mockUserId)
        const { name, lastMessage } = await response.json()
        setName(name)
        setLastMessage(lastMessage)
      }
    }
    fetchNameWithLastMessage()
  }, [])
  return (
    <div className="flex flex-row items-center h-[79px] w-[339px] bg-opacity-50 bg-gray-300 rounded-md mt-[10px]">
      <div className="h-[60px] w-[60px] rounded-full bg-black mx-2"></div>
      <div className="flex flex-col ml-4">
        <p className="text-xl font-semibold">พอตเต้อ</p>
        <p className="text-sm">อยากมีแฟน</p>
      </div>
    </div>
  )
}
