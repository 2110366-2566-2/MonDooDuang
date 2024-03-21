import { NotificationTypes } from "../../../types/NotificationTypes"
import AppointmentNotification from "./AppointmentNotification"
import ChatNotification from "./ChatNotification"

export default function NotificationList({
  notificationItem,
  userId
}: {
  notificationItem: NotificationTypes
  userId: string
}) {
  return (
    <>
      {notificationItem.notificationType === "APPOINTMENT" && (
        <>
          <AppointmentNotification
            notificationId={notificationItem.notificationId}
            userId={userId}
          />
        </>
      )}
      {notificationItem.notificationType === "CHAT" && (
        <ChatNotification notificationId={notificationItem.notificationId} userId={userId} />
      )}
      {/* {notificationItem.notificationType === "VERIFICATION" && (
        <ChatNotification notificationId={notificationItem.notificationId} userId={userId} />
      )} */}
    </>
  )
}
