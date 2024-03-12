import { NotificationTypes } from "../../../types/NotificationTypes"
import AppointmentNotification from "./AppointmentNotification"

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
    </>
  )
}
