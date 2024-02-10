import ConversationList from "./ConversationList"
import SearchIcon from "@mui/icons-material/Search"
interface ConversationSidebarProps {
  conversationIds: string[]
  onConversationSelect: (conversationId: string) => void
  selectedConversationId: string
}

export default function ConversationSidebar({
  conversationIds,
  onConversationSelect,
  selectedConversationId
}: ConversationSidebarProps) {
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
        <ConversationList
          conversationId={conversationId}
          key={conversationId}
          isSelected={conversationId === selectedConversationId}
          onSelect={() => onConversationSelect(conversationId)}
        />
      ))}
    </div>
  )
}
