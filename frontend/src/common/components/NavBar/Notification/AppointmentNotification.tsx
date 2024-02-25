import { useEffect, useState } from "react"
import {
  AppointmentNotificationType,
  AppointmentNotificationTypes
} from "../../../types/NotificationTypes"
import { NotificationService } from "../../../services/NotificationService"
import { specialityMapper } from "../../../../pages/FortuneTellerDetailPage/components/Packages/PackageList"
import { Speciality } from "../../../../pages/FortuneTellerDetailPage/types/PackageTypes"

const typeMapper: Record<AppointmentNotificationType, string> = {
  NEW: "ต้องการนัดหมาย",
  ACCEPT: "ได้ตอบรับการนัดหมาย",
  DENY: "ได้ปฏิเสธการนัดหมาย",
  CANCEL: "ได้ยกเลิกการนัดหมาย",
  REMINDER: "ศาสตร์รูนส์",
  COMPLETE: ""
}

export default function AppointmentNotification({
  notificationId,
  userId
}: {
  notificationId: string
  userId: string
}) {
  const [appointmentNotification, setAppointmentNotification] =
    useState<AppointmentNotificationTypes>()

  function translateAppointmentNotificationType(type: AppointmentNotificationType) {
    return typeMapper[type]
  }

  function translateSpeciality(specialty: Speciality) {
    return specialityMapper[specialty]
  }

  function showDate(date: Date): string {
    return date.toString().substring(0, 10)
  }

  function showTime(date: Date): string {
    return date.toString().substring(11, 16)
  }

  useEffect(() => {
    const fetchAppointmentNotification = async ({
      notificationId,
      userId
    }: {
      notificationId: string
      userId: string
    }) => {
      const appointmentNotification = await NotificationService.getAppointmentNotification(
        notificationId,
        userId
      )
      setAppointmentNotification(appointmentNotification)
    }
    fetchAppointmentNotification({ notificationId, userId })
  }, [])

  if (appointmentNotification)
    return (
      <>
        {appointmentNotification.appointmentNotificationType === "COMPLETE" ? (
          <div className="flex flex-col">
            <div className="flex">
              <div>การนัดหมายดูดวงเสร็จละจ้าเดะมาทำต่อ</div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <div className="flex gap-1">
              <div className="font-semibold text-mdd-yellow-noti">
                {appointmentNotification.otherName}
              </div>
              <div>
                {translateAppointmentNotificationType(
                  appointmentNotification.appointmentNotificationType
                )}
              </div>
              <div className="font-semibold text-mdd-yellow-noti">
                {translateSpeciality(appointmentNotification.speciality)}
              </div>
              <div>กับคุณ</div>
            </div>
            <div className="flex gap-1">
              <div>ในวันที่</div>
              <div className="text-mdd-yellow-noti">
                {showDate(appointmentNotification.appointmentDate)}
              </div>
              <div>เวลา</div>
              <div className="text-mdd-yellow-noti">
                {showTime(appointmentNotification.appointmentDate)}
              </div>
              <div>น.</div>
            </div>
            {appointmentNotification.appointmentNotificationType === "NEW" && (
              <div className="flex self-end gap-4">
                <button className="rounded-[10px] border border-mdd-red-success-text text-mdd-red-success-text text-center p-1 w-28">
                  ปฏิเสธ
                </button>
                <button className="rounded-[10px] border border-mdd-muted-green bg-mdd-muted-green text-white text-center p-1 w-28">
                  ตอบรับนัดหมาย
                </button>
              </div>
            )}
            <div className="flex self-end gap-1 text-gray-500 text-sm">
              <div>วันที่</div>
              <div>{showDate(appointmentNotification.updatedAt)}</div>
              <div>เวลา</div>
              <div>{showTime(appointmentNotification.updatedAt)}</div>
              <div>น.</div>
            </div>
          </div>
        )}
      </>
    )
}
