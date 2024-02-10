import VolumeUpIcon from "@mui/icons-material/VolumeUp"
import VolumeOffIcon from "@mui/icons-material/VolumeOff"
import SearchIcon from "@mui/icons-material/Search"
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred"
import { useState } from "react"
interface ConversationHeaderProps {
  name: string
  showReport: () => void
}
export default function ConversationHeader({ name, showReport }: ConversationHeaderProps) {
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true)
  const toggleNotifications = () => {
    setIsNotificationsEnabled((prev) => !prev)
  }

  return (
    <div className="h-[60px] flex items-center justify-between p-4 bg-white bg-opacity-85">
      <div className="flex items-center">
        <div className="font-bold text-xl mr-2">{name}</div>
        {isNotificationsEnabled ? (
          <VolumeUpIcon onClick={toggleNotifications} />
        ) : (
          <VolumeOffIcon onClick={toggleNotifications} />
        )}
      </div>
      <div className="flex items-center">
        <SearchIcon className="mr-2" />
        <ReportGmailerrorredIcon
          onClick={() => {
            showReport()
          }}
        />
      </div>
    </div>
  )
}
