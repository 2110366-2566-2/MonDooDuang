import { useEffect, useState } from "react"
import { NotificationService } from "../../../services/NotificationService"
import { ChatNotificationTypes } from "../../../types/NotificationTypes"
import { showFullDate, showTime } from "../../../utils/FormatUtils"

export default function ChatNotification({
  notificationId,
  userId
}: {
  notificationId: string
  userId: string
}) {
  const [chatNotification, setChatNotification] = useState<ChatNotificationTypes>({} as ChatNotificationTypes)

  useEffect(() => {
    const fetchChatNotifications = async () => {
      const notification = await NotificationService.getChatNotification(notificationId, userId)
      setChatNotification(notification)
    }
    fetchChatNotifications()
  }, [])

  return <>
    <div className="flex gap-1">
      <div>คุณได้รับข้อความใหม่จาก</div>
      <div className="font-semibold text-mdd-yellow600">
        {chatNotification.otherName}
      </div>
    </div>
    <div className="flex justify-end gap-1 text-gray-500 text-sm">
      <div>วันที่</div>
      <div>{showFullDate(chatNotification.updatedAt)}</div>
      <div>เวลา</div>
      <div>{showTime(chatNotification.updatedAt, 0)}</div>
      <div>น.</div>
    </div>
  </>
}
