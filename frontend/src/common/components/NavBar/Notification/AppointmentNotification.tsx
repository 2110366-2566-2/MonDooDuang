import { useEffect, useState } from "react"
import {
  AppointmentNotificationType,
  AppointmentNotificationTypes,
  NotificationType
} from "../../../types/NotificationTypes"
import { NotificationService } from "../../../services/NotificationService"
import { specialityMapper } from "../../../../pages/FortuneTellerDetailPage/components/Packages/PackageList"
import { Speciality } from "../../../../pages/FortuneTellerDetailPage/types/PackageTypes"
import ReportModal from "../../../../pages/ConversationPage/components/ReportModal"
import { AppointmentService } from "../../../services/AppointmentService"
import { AppointmentStatusType } from "../../../types/Appointment"

const typeMapper: Record<AppointmentNotificationType, string> = {
  NEW: "ต้องการนัดหมาย",
  ACCEPT: "ได้ตอบรับการนัดหมาย",
  DENY: "ได้ปฏิเสธการนัดหมาย",
  CANCEL: "ได้ยกเลิกการนัดหมาย",
  REMINDER: "",
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
    useState<AppointmentNotificationTypes>({} as AppointmentNotificationTypes)
  const [isShowReport, setIsShowReport] = useState(false)

  function translateAppointmentNotificationType(type: AppointmentNotificationType) {
    return typeMapper[type]
  }

  function translateSpeciality(specialty: Speciality) {
    return specialityMapper[specialty]
  }

  function addTimes(date: Date, minutes: number, hours: number): Date {
    const result = new Date(date)
    result.setMinutes(result.getMinutes() + minutes)
    result.setHours(result.getHours() + hours)
    return result
  }

  function padTo2Digits(num: number): string {
    return num.toString().padStart(2, "0")
  }

  function showDate(date: Date): string {
    date = addTimes(date, 0, 7)
    return (
      padTo2Digits(date.getDate()) +
      "/" +
      padTo2Digits(date.getMonth() + 1) +
      "/" +
      date.getFullYear()
    )
  }

  function showTime(date: Date, duration: number): string {
    date = addTimes(date, duration, 7)
    return padTo2Digits(date.getHours()) + "." + padTo2Digits(date.getMinutes())
  }

  const showReport = () => {
    setIsShowReport(true)
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

  const updateAppointmentStatus = async (status: AppointmentStatusType, appointmentId: string) => {
    await AppointmentService.updateAppointmentStatus(status, appointmentId)
  }

  const updateNotificationType = async (type: NotificationType, notificationId: string) => {
    await NotificationService.updateNotificationType(type, notificationId)
  }

  const handleRequestButton = async (status: AppointmentStatusType) => {
    await updateAppointmentStatus(status,appointmentNotification.appointmentId)
    await updateNotificationType("HIDDEN",notificationId)
    window.location.reload()
  }

  return (
    <div className="flex flex-col gap-2">
      {appointmentNotification.appointmentNotificationType === "REMINDER" ? (
        <>
          <div className="flex gap-1">
            <div>การนัดหมายดูดวง</div>
            <div className="font-semibold text-mdd-yellow600">
              {translateSpeciality(appointmentNotification.speciality)}
            </div>
            <div>กับ</div>
            <div className="font-semibold text-mdd-yellow600">
              {appointmentNotification.otherName}
            </div>
          </div>
          <div className="flex gap-1">
            <div>กำลังจะมาถึงในอีก 10 นาที</div>
          </div>
        </>
      ) : appointmentNotification.appointmentNotificationType === "COMPLETE" ? (
        <>
          <div className="flex gap-1">
            <div>การนัดหมายดูดวง</div>
            <div className="font-semibold text-mdd-yellow600">
              {translateSpeciality(appointmentNotification.speciality)}
            </div>
            <div>กับ</div>
            <div className="font-semibold text-mdd-yellow600">
              {appointmentNotification.otherName}
            </div>
            <div>สิ้นสุดแล้ว</div>
          </div>
          <div className="flex self-end gap-4">
            <button
              onClick={showReport}
              className="rounded-[10px] border border-mdd-red-success-text text-mdd-red-success-text text-center p-1 w-36"
            >
              รายงานปัญหาระบบ
            </button>
          </div>
          <ReportModal
            isShowReport={isShowReport}
            setIsShowReport={setIsShowReport}
            isCustomer={appointmentNotification.isCustomer}
            userId={userId}
            conversationId={appointmentNotification.conversationId}
            isSystemReport={true}
          />
        </>
      ) : (
        <>
          <div className="flex gap-1">
            <div className="font-semibold text-mdd-yellow600">
              {appointmentNotification.otherName}
            </div>
            <div>
              {translateAppointmentNotificationType(
                appointmentNotification.appointmentNotificationType
              )}
            </div>
            <div className="font-semibold text-mdd-yellow600">
              {translateSpeciality(appointmentNotification.speciality)}
            </div>
            <div>กับคุณ</div>
          </div>
          <div className="flex gap-1">
            <div>ในวันที่</div>
            <div className="text-mdd-yellow600">
              {showDate(appointmentNotification.appointmentDate)}
            </div>
            <div>เวลา</div>
            <div className="text-mdd-yellow600">
              {showTime(appointmentNotification.appointmentDate, 0)} {" - "}
              {showTime(appointmentNotification.appointmentDate, appointmentNotification.duration)}
            </div>
            <div>น.</div>
          </div>
          {appointmentNotification.appointmentNotificationType === "CANCEL" &&
            appointmentNotification.isCustomer && (
            <div className="flex gap-1">
              <div>ระบบจะทำการคืนเงินให้ภายใน 7 วัน</div>
            </div>
          )}
          {appointmentNotification.appointmentNotificationType === "NEW" && (
            <div className="flex self-end gap-4">
              <button onClick={() => handleRequestButton("FORTUNE_TELLER_DECLINED")} className="rounded-[10px] border border-mdd-red-success-text text-mdd-red-success-text text-center p-1 w-28">
                ปฏิเสธ
              </button>
              <button onClick={() => handleRequestButton("WAITING_FOR_PAYMENT")} className="rounded-[10px] border border-mdd-muted-green bg-mdd-muted-green text-white text-center p-1 w-28">
                ตอบรับนัดหมาย
              </button>
            </div>
          )}
        </>
      )}
      <div className="flex self-end gap-1 text-gray-500 text-sm">
        <div>วันที่</div>
        <div>{showDate(appointmentNotification.updatedAt)}</div>
        <div>เวลา</div>
        <div>{showTime(appointmentNotification.updatedAt, 0)}</div>
        <div>น.</div>
      </div>
    </div>
  )
}
