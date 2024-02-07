import VolumeUpIcon from "@mui/icons-material/VolumeUp"
import VolumeOffIcon from "@mui/icons-material/VolumeOff"
import SearchIcon from "@mui/icons-material/Search"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import { useState } from "react"
interface ChatHeaderProps {
  name: string
}
export default function ChatHeader({ name }: ChatHeaderProps) {
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
        <MoreVertIcon />
      </div>
    </div>
  )
}
