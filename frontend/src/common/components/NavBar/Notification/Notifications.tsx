import { useEffect, useState } from "react"
import { NotificationService } from "../../../services/NotificationService"
import { NotificationTypes } from "../../../types/NotificationTypes"
import NotificationList from "./NotificationList"

export default function Notifications({ userId }: { userId: string }) {
  const [notifications, setNotifications] = useState<NotificationTypes[]>([])

  useEffect(() => {
    const fetchNotifications = async () => {
      const notifications = await NotificationService.getNotifications(userId)
      notifications ? setNotifications(notifications) : setNotifications([])
    }
    fetchNotifications()
  }, [])

  return (
    <div className="z-50 absolute top-16 right-32 bg-white rounded-xl w-1/3 max-h-[500px] overflow-y-auto p-4">
      {notifications.length ? (
        notifications
          .map((notificationItem) => (
            <>
              <NotificationList notificationItem={notificationItem} userId={userId} />
            </>
          ))
          .reduce((prev, curr) => (
            <>
              {prev}
              <div className="bg-yellow-300 w-full h-px my-4" />
              {curr}
            </>
          ))
      ) : (
        <div className="text-center">- ไม่มีการแจ้งเตือน -</div>
      )}
    </div>
  )
}
