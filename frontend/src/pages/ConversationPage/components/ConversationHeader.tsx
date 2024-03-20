import VolumeUpIcon from "@mui/icons-material/VolumeUp"
import VolumeOffIcon from "@mui/icons-material/VolumeOff"
import SearchIcon from "@mui/icons-material/Search"
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred"
import BaseAppointmentCard from "../../../common/components/AppointmentCard/BaseAppointmentCard"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AppointmentService } from "../services/AppointmentService"
import { AppointmentInformation } from "../types/AppointmentInformation"
import { specialityMapper } from "../../../common/types/Package"
import PaymentIcon from "../../../common/components/AppointmentCard/Icon/PaymentIcon"
import SuccessIcon from "../../../common/components/AppointmentCard/Icon/SuccessIcon"
import { formatDateTime } from "../../../common/utils/FormatUtils"
import ErrorIcon from "../../../common/components/AppointmentCard/Icon/ErrorIcon"
import dayjs from "dayjs"
import NotiIcon from "../../../common/components/AppointmentCard/Icon/NotiIcon"
import EventCompleteCard from "./EventCompleteCard"
import WandIcon from "../../../common/components/AppointmentCard/Icon/WandIcon"

export default function ConversationHeader({
  name,
  showReport,
  conversationId,
  systemReport,
  userType
}: {
  name: string
  showReport: () => void
  conversationId: string | null
  systemReport: (selectReportMode: boolean) => void
  userType: string
}) {
  const navigate = useNavigate()
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState<boolean>(true)
  const [appointments, setAppointments] = useState<AppointmentInformation[]>([])

  useEffect(() => {
    const fetchAppointments = async () => {
      const appointments = await AppointmentService.getAppointmentsByConversationId(conversationId)
      setAppointments(appointments)
    }
    fetchAppointments()
  }, [name])

  const toggleNotifications = () => {
    setIsNotificationsEnabled((prev) => !prev)
  }

  const getWaitingForPaymentInfo = (price: number, paymentDate: string, paymentTime: string) => {
    const content = (
      <>
        <h1 className="text-mdd-yellow600 font-semibold text-[28px]">กำลังรอการชำระเงิน</h1>
        <p className="text-mdd-gray-success-text">
          ยอดที่ต้องชำระ {price} บาท <br /> สามารถชำระได้จนถึงวันที่ {paymentDate} เวลา{" "}
          {paymentTime} น.
        </p>
      </>
    )
    const moreContent =
      "*หากไม่ชำระภายในวันและเวลาที่กำหนด ทางเว็บไซต์ขออนุญาตยกเลิกการนัดหมายดูดวง"
    const button = (
      <button
        className="h-[37px] rounded-[10px] px-2 text-white bg-mdd-muted-green mx-5"
        onClick={() => navigate(`/payment/${price}`)}
      >
        ชำระเงินค่าดูดวง
      </button>
    )
    return { content, moreContent, button }
  }

  const getWaitingForEventInfo = (appointmentId: string) => {
    const content = (
      <>
        <h1 className="text-mdd-yellow600 font-semibold text-[28px]">ชำระเงินเรียบร้อย</h1>
        <p className="text-mdd-gray-success-text">การนัดหมายของคุณได้ถูกจองเสร็จสมบูรณ์</p>
      </>
    )
    const moreContent =
      "*ทั้งหมอดูและลูกค้าสามารถกดยกเลิกการนัดหมายได้ โดยสามารถยกเลิกได้ถึงก่อนวันนัดหมาย 3 วัน"
    const button = (
      <button
        className="h-[37px] rounded-[10px] px-2 text-white bg-mdd-cancel-red mx-5"
        onClick={() => {
          if (confirm("โปรดกดตกลง เพื่อยกเลิกการนัดหมาย") == true) {
            userType === "FORTUNE_TELLER"
              ? AppointmentService.updateAppointmentStatus("FORTUNE_TELLER_CANCELED", appointmentId)
              : AppointmentService.updateAppointmentStatus("CUSTOMER_CANCELED", appointmentId)
            window.location.reload()
          }
        }}
      >
        ยกเลิกการดูดวง
      </button>
    )
    return { content, moreContent, button }
  }

  const getUpComingEventInfo = (startTime: string, endTime: string, date: string) => {
    const content = (
      <>
        <h1 className="text-mdd-yellow600 font-semibold text-[28px]">แจ้งการนัดหมายดูดวง</h1>
        <p className="text-mdd-gray-success-text">
          คุณมีนัดหมายดูดวงในวันที่ {date} เวลา {startTime} - {endTime} น.
        </p>
      </>
    )
    const moreContent = ""
    const button = <></>
    return { content, moreContent, button }
  }

  const getCanceledEventInfo = () => {
    const content = (
      <>
        <h1 className="text-mdd-cancel-red font-semibold text-[28px]">การนัดหมายถูกยกเลิก</h1>
        <p className="text-mdd-gray-success-text">ระบบจะทำการคืนเงินให้กับลูกค้า</p>
        <p className="text-mdd-gray-success-text">
          ขออภัยในความไม่สะดวก และหวังว่าเราจะได้พบกันในโอกาสหน้า
        </p>
      </>
    )
    const moreContent = ""
    const button = <></>
    return { content, moreContent, button }
  }

  const getDeclinedEventInfo = () => {
    const content = (
      <>
        <h1 className="text-mdd-cancel-red font-semibold text-[28px]">การนัดหมายถูกยกเลิก</h1>
        <p className="text-mdd-gray-success-text">เนื่องจากหมอดูปฏิเสธการนัดหมาย</p>
      </>
    )
    const moreContent = ""
    const button = <></>
    return { content, moreContent, button }
  }

  const getSuspendedEventInfo = () => {
    const content = (
      <>
        <h1 className="text-mdd-cancel-red font-semibold text-[28px]">การชำระเงินถูกระงับ</h1>
        <p className="text-mdd-gray-success-text">เนื่องจากมีการรายงานว่าหมอดูไม่มาตามเวลานัดหมาย</p>
        <p className="text-mdd-gray-success-text">
          โปรดรอการตรวจสอบจากผู้ดูแลระบบ
        </p>
      </>
    )
    const moreContent = ""
    const button = <></>
    return { content, moreContent, button }
  }

  const getRefundedEventInfo = () => {
    const content = (
      <>
        <h1 className="text-mdd-cancel-red font-semibold text-[28px]">การนัดหมายถูกยกเลิก</h1>
        <p className="text-mdd-gray-success-text">เนื่องจากหมอดูไม่มาตามเวลานัดหมาย</p>
        <p className="text-mdd-gray-success-text">
          ระบบจะทำการคืนเงินให้กับลูกค้า
        </p>
      </>
    )
    const moreContent = ""
    const button = <></>
    return { content, moreContent, button }
  }

  const getNoFraudDetectEventInfo = () => {
    const content = (
      <>
        <h1 className="text-mdd-yellow600 font-semibold text-[28px]">ตรวจสอบไม่พบปัญหา</h1>
        <p className="text-mdd-gray-success-text">ระบบจะทำการโอนเงินให้หมอดูตามปกติ</p>
      </>
    )
    const moreContent = ""
    const button = <></>
    return { content, moreContent, button }
  }

  const getEventInProgressInfo = (appointmentId: string) => {
    const content = (
      <>
        <h1 className="text-mdd-yellow600 font-semibold text-[28px]">กำลังดูดวง</h1>
        <p className="text-mdd-gray-success-text">
          {userType === "FORTUNE_TELLER"
            ? "กดจบงานเพื่อยืนยันว่าการดูดวงของคุณเสร็จสิ้นแล้ว"
            : "กด 99 เพื่อน้อมรับคำทำนาย"}
        </p>
      </>
    )
    const moreContent = ""
    const button =
      userType === "FORTUNE_TELLER" ? (
        <button
          className="h-[37px] rounded-[10px] px-8 text-white bg-mdd-muted-green mx-5"
          onClick={() => {
            if (confirm("โปรกดตกลง เพื่อยืนยันการจบงาน") == true) {
              AppointmentService.updateAppointmentStatus("EVENT_COMPLETED", appointmentId)
              window.location.reload()
            }
          }}
        >
          จบงาน
        </button>
      ) : (
        <></>
      )
    return { content, moreContent, button }
  }

  return (
    <div className="flex flex-col bg-white bg-opacity-85">
      <div className="h-[60px] flex items-center justify-between p-4">
        <div className="flex items-center">
          <div className="font-bold text-xl mr-2">{name}</div>
          {isNotificationsEnabled ? (
            <VolumeUpIcon onClick={toggleNotifications} />
          ) : (
            <VolumeOffIcon onClick={toggleNotifications} />
          )}
        </div>
        <div className="flex items-center">
          <SearchIcon className="mr-2" />
          <ReportGmailerrorredIcon
            onClick={() => {
              systemReport(false)
              showReport()
            }}
          />
        </div>
      </div>
      {appointments.map((appointment) => {
        const [formattedDate, startTime] = formatDateTime(appointment.appointmentDate)
        const appointmentDateTime = new Date(appointment.appointmentDate)
        const endDateTime = new Date(appointmentDateTime.getTime() + appointment.duration * 60000)
        const endTime = formatDateTime(endDateTime.toISOString())[1]
        const paymentDateTime = new Date(appointmentDateTime.getTime() + 24 * 60 * 60 * 1000)
        const [paymentDate, paymentTime] = formatDateTime(paymentDateTime.toISOString())

        const today = new Date()
        const waiting_day = dayjs(appointmentDateTime).diff(
          dayjs(today).format("YYYY-MM-DD"),
          "day"
        )

        if (appointment.status === "WAITING_FOR_PAYMENT" && userType === "CUSTOMER") {
          const { content, moreContent, button } = getWaitingForPaymentInfo(
            appointment.price,
            paymentDate,
            paymentTime
          )
          return (
            <BaseAppointmentCard
              icon={<PaymentIcon />}
              content={content}
              moreContent={moreContent}
              button={button}
              formattedDate={formattedDate}
              startTime={startTime}
              endTime={endTime}
              speciality={specialityMapper[appointment.speciality]}
            />
          )
        } else if (appointment.status === "WAITING_FOR_EVENT") {
          if (appointmentDateTime < today) {
            const { content, moreContent, button } = getEventInProgressInfo(
              appointment.appointmentId
            )
            return (
              <BaseAppointmentCard
                icon={<WandIcon />}
                content={content}
                moreContent={moreContent}
                button={button}
                formattedDate={formattedDate}
                startTime={startTime}
                endTime={endTime}
                speciality={specialityMapper[appointment.speciality]}
              />
            )
          } else if (waiting_day < 3) {
            const { content, moreContent, button } = getUpComingEventInfo(
              startTime,
              endTime,
              formattedDate
            )
            return (
              <BaseAppointmentCard
                icon={<NotiIcon />}
                content={content}
                moreContent={moreContent}
                button={button}
                formattedDate={formattedDate}
                startTime={startTime}
                endTime={endTime}
                speciality={specialityMapper[appointment.speciality]}
              />
            )
          }
          const { content, moreContent, button } = getWaitingForEventInfo(appointment.appointmentId)
          return (
            <BaseAppointmentCard
              icon={<SuccessIcon />}
              content={content}
              moreContent={moreContent}
              button={button}
              formattedDate={formattedDate}
              startTime={startTime}
              endTime={endTime}
              speciality={specialityMapper[appointment.speciality]}
            />
          )
        } else if (
          appointment.status === "FORTUNE_TELLER_CANCELED" ||
          appointment.status === "CUSTOMER_CANCELED"
        ) {
          const { content, moreContent, button } = getCanceledEventInfo()
          return (
            <BaseAppointmentCard
              icon={<ErrorIcon />}
              content={content}
              moreContent={moreContent}
              button={button}
              formattedDate={formattedDate}
              startTime={startTime}
              endTime={endTime}
              speciality={specialityMapper[appointment.speciality]}
            />
          )
        } else if (appointment.status === "FORTUNE_TELLER_DECLINED") {
          const { content, moreContent, button } = getDeclinedEventInfo()
          return (
            <BaseAppointmentCard
              icon={<ErrorIcon />}
              content={content}
              moreContent={moreContent}
              button={button}
              formattedDate={formattedDate}
              startTime={startTime}
              endTime={endTime}
              speciality={specialityMapper[appointment.speciality]}
            />
          )
        } else if (appointment.status === "EVENT_COMPLETED") {
          return (
            <EventCompleteCard
              formattedDate={formattedDate}
              startTime={startTime}
              endTime={endTime}
              speciality={specialityMapper[appointment.speciality]}
              appointmentId={appointment.appointmentId}
              fortuneTellerId={appointment.fortuneTellerId}
              customerId={appointment.customerId}
              isCustomer={userType === "CUSTOMER"}
              showReport={showReport}
              systemReport={systemReport}
            />
          )
        }  else if (
          appointment.status === "SUSPENDED"
        ) {
          const { content, moreContent, button } = getSuspendedEventInfo()
          return (
            <BaseAppointmentCard
              icon={<ErrorIcon />}
              content={content}
              moreContent={moreContent}
              button={button}
              formattedDate={formattedDate}
              startTime={startTime}
              endTime={endTime}
              speciality={specialityMapper[appointment.speciality]}
            />
          )
        } else if (
          appointment.status === "REFUNDED"
        ) {
          const { content, moreContent, button } = getRefundedEventInfo()
          return (
            <BaseAppointmentCard
              icon={<ErrorIcon />}
              content={content}
              moreContent={moreContent}
              button={button}
              formattedDate={formattedDate}
              startTime={startTime}
              endTime={endTime}
              speciality={specialityMapper[appointment.speciality]}
            />
          )
        } else if (
          appointment.status === "NO_FRAUD_DETECTED"
        ) {
          const { content, moreContent, button } = getNoFraudDetectEventInfo()
          return (
            <BaseAppointmentCard
              icon={<SuccessIcon />}
              content={content}
              moreContent={moreContent}
              button={button}
              formattedDate={formattedDate}
              startTime={startTime}
              endTime={endTime}
              speciality={specialityMapper[appointment.speciality]}
            />
          )
        } 
      })}
    </div>
  )
}
