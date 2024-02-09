import ChatList from "./ChatList"
import SearchIcon from "@mui/icons-material/Search"
interface ChatSidebarProps {
  conversationIds: string[]
  onConversationSelect: (conversationId: string) => void
  selectedConversationId: string
}

export default function ChatSidebar({
  conversationIds,
  onConversationSelect,
  selectedConversationId
}: ChatSidebarProps) {
  return (
    <div className="overflow-y-auto h-screen flex flex-col items-center justify-start">
      <div className="relative">
        <SearchIcon />
        <input
          type="text"
          placeholder={"ค้นหาข้อความและห้องแชท"}
          className="h-[32px] w-[307px] mt-[10px] p-2 rounded-3xl bg-gray-300 text-white placeholder-white"
        />
      </div>
      {conversationIds.map((conversationId) => (
        <ChatList
          conversationId={conversationId}
          key={conversationId}
          isSelected={conversationId === selectedConversationId}
          onSelect={() => onConversationSelect(conversationId)}
        />
      ))}
    </div>
  )
}
