import { NotificationTypes } from "../../../types/NotificationTypes"
import { showFullDate, showTime } from "../../../utils/FormatUtils"

export default function VerificationNotification({
  notification
}: {
  notification: NotificationTypes
}) {
  return (
    <div className="flex flex-col gap-2">
      {notification.notificationType === "VERIFICATION" ? (
        <>
          <div className="flex gap-1">
            <div>คุณได้รับการ</div>
            <div className="font-semibold text-mdd-yellow600">รับรอง</div>
            <div>จากผู้ดูแล</div>
          </div>
          <div>กรุณา log in ใหม่อีกครั้งเพื่อใช้งานในฐานะหมอดู</div>
        </>
      ) : (
        <>
          <div className="flex gap-1">
            <div>คุณถูก</div>
            <div className="font-semibold text-mdd-yellow600">ปฏิเสธ</div>
            <div>จากผู้ดูแล</div>
          </div>
          <div>กรุณาลงทะเบียนใหม่อีกครั้งหากต้องการใช้งานในฐานะหมอดู</div>
        </>
      )}
      <div className="flex self-end gap-1 text-gray-500 text-sm">
        <div>วันที่</div>
        <div>{showFullDate(notification.updatedAt)}</div>
        <div>เวลา</div>
        <div>{showTime(notification.updatedAt, 0)}</div>
        <div>น.</div>
      </div>
    </div>
  )
}
