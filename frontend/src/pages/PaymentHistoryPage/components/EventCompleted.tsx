import { useEffect, useState } from "react"
import { AppointmentInformation } from "../types/AppointmentInformation"
import { AppointmentService } from "../services/AppointmentService"
import { AppointmentStatusType } from "../../../common/types/Appointment"
import { Specialities, specialitiesName } from "../../SearchPage/types/SpecialityType"
import { showFullDate, showTime } from "../../../common/utils/FormatUtils"
import CompleteEventIcon from "../../../common/components/AppointmentCard/Icon/CompleteEventIcon"
export default function EventCompleted({
  userId,
  status
}: {
  userId: string
  status: AppointmentStatusType
}) {
  const [AppointmentInformation, setAppointmentInformation] = useState<AppointmentInformation[]>([])
  useEffect(() => {
    const fetchAppointmentInformation = async () => {
      const appointmentInformation = await AppointmentService.getAppointmentsByStatus(
        userId,
        status
      )
      setAppointmentInformation(appointmentInformation)
    }
    fetchAppointmentInformation()
  }, [])
  return (
    <>
      <div className="overflow-y-auto h-screen w-[70%]">
        {AppointmentInformation.map((appointment) => (
          <div
            className="flex flex-row bg-white bg-opacity-50 p-3 w-[100%] rounded-xl my-3"
            key={appointment.appointmentId}
          >
            <div className="w-[5px] bg-yellow-300 rounded-full mr-3"></div>
            <CompleteEventIcon />
            <div className="flex flex-col justify-start">
              <div className="text-white text-xl font-bold">การดูดวงเสร็จสิ้น</div>
              <div className="text-white text-xs my-1 font-light">
                ขอขอบคุณที่ใช้บริการ MonDooDuang
              </div>
              <div className="text-white text-s flex flex-row">
                นัดหมายดูดวง
                <div className="text-yellow-300">
                  &nbsp;{specialitiesName[appointment.speciality as Specialities]}&nbsp;
                </div>
                กับ
                <div className="text-yellow-300">&nbsp;{appointment.stageName}</div>
              </div>
              <div className="text-white text-s flex flex-row">
                ในวันที่&nbsp;{showFullDate(appointment.appointmentDate)}&nbsp;เวลา
                <div className="text-yellow-300">
                  &nbsp;{showTime(appointment.appointmentDate, 0)}&nbsp;-&nbsp;
                  {showTime(appointment.appointmentDate, appointment.duration)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
