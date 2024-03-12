import { useEffect, useState } from "react"
import { NotificationService } from "../../../services/NotificationService"

export default function ChatNotification({
  notificationId,
  userId
}: {
  notificationId: string
  userId: string
}) {
  const [otherName, setOtherName] = useState<string>("")

  useEffect(() => {
    const fetchChatNotifications = async () => {
      const otherName = await NotificationService.getChatNotification(notificationId, userId)
      setOtherName(otherName)
    }
    fetchChatNotifications()
  }, [])

  return <>Hi {otherName}</>
}
