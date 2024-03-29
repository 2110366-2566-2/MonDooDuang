import { useState, useEffect } from "react"
import ConversationList from "./ConversationList"
import { ConversationService } from "../services/ConversationService"
import { MessageInformation } from "../types/MessageInformation"

export default function ConversationSidebar({
  onConversationSelect,
  selectedConversationId,
  userId,
  userType,
  messages
}: {
  onConversationSelect: (conversationId: string) => void
  selectedConversationId: string | null
  userId: string
  userType: "CUSTOMER" | "FORTUNE_TELLER" | "ADMIN"
  messages: MessageInformation[]
}) {
  const [customerConversationIds, setCustomerConversationIds] = useState<string[]>([])
  const [fortuneTellerConversationIds, setFortuneTellerConversationIds] = useState<string[]>([])
  const [filteredConversations, setFilteredConversations] = useState<string[]>([])
  const [selectedMode, setSelectedMode] = useState<"CUSTOMER" | "FORTUNE_TELLER">("FORTUNE_TELLER")
  const handleModeSelect = (mode: "CUSTOMER" | "FORTUNE_TELLER") => {
    setSelectedMode(mode)
  }
  useEffect(() => {
    const fetchConversations = async () => {
      const customerConversationIds = await ConversationService.getConversationsByUserId(
        userId,
        "CUSTOMER"
      )
      setCustomerConversationIds(customerConversationIds)
      const fortuneTellerConversationIds = await ConversationService.getConversationsByUserId(
        userId,
        "FORTUNE_TELLER"
      )
      setFortuneTellerConversationIds(fortuneTellerConversationIds)
      if (selectedMode === "FORTUNE_TELLER") setFilteredConversations(fortuneTellerConversationIds)
      else setFilteredConversations(customerConversationIds)
    }
    fetchConversations()
  }, [messages])

  useEffect(() => {
    if (selectedMode === "CUSTOMER") {
      setFilteredConversations(customerConversationIds)
    } else {
      setFilteredConversations(fortuneTellerConversationIds)
    }
  }, [selectedMode])

  return (
    <div className="overflow-y-auto h-screen flex flex-col items-center justify-start">
      {userType === "FORTUNE_TELLER" && (
        <div className="flex">
          <div
            className={`cursor-pointer p-2 border-b-2 w-[130px] flex justify-center ${
              selectedMode === "CUSTOMER"
                ? "text-yellow-200 border-yellow-200 font-bold border-b-4"
                : "text-white border-white"
            }`}
            onClick={() => handleModeSelect("CUSTOMER")}
          >
            ลูกค้า
          </div>
          <div
            className={`cursor-pointer p-2 border-b-2 w-[130px] flex justify-center ${
              selectedMode === "FORTUNE_TELLER"
                ? "text-yellow-200 border-yellow-300 font-bold border-b-4"
                : "text-white border-white"
            }`}
            onClick={() => handleModeSelect("FORTUNE_TELLER")}
          >
            หมอดู
          </div>
        </div>
      )}
      <div className="relative">
        <input
          type="text"
          placeholder={"ค้นหาข้อความและห้องแชท"}
          className="h-[32px] w-[307px] mt-[10px] p-2 rounded-3xl bg-gray-300 text-white placeholder-white"
        />
      </div>
      {filteredConversations.map((conversationId) => (
        <ConversationList
          conversationId={conversationId}
          key={conversationId}
          isSelected={conversationId === selectedConversationId}
          onSelect={() => onConversationSelect(conversationId)}
          userId={userId}
          role={selectedMode}
        />
      ))}
    </div>
  )
}
