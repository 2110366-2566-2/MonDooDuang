import { NotificationTypes } from "../../../types/NotificationTypes"
import AppointmentNotification from "./AppointmentNotification"
import ChatNotification from "./ChatNotification"
import VerificationNotification from "./VerificationNotification"

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
      {(notificationItem.notificationType === "VERIFICATION" ||
        notificationItem.notificationType === "CANCELED_VERIFICATION") && (
        <VerificationNotification notification={notificationItem} />
      )}
    </>
  )
}
