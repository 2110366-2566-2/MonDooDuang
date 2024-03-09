import { useEffect, useState } from "react"
import BaseAppointmentCard from "../../../common/components/AppointmentCard/BaseAppointmentCard"
import { AppointmentService } from "../services/AppointmentService"
import CompleteEventIcon from "../../../common/components/AppointmentCard/Icon/CompleteEventIcon"
import ReviewModal from "./Review/ReviewModal"
import { FortuneTellerService } from "../../FortuneTellerAccountPage/services/FortuneTellerService"

export default function EventCompleteCard(props: {
  formattedDate: string
  startTime: string
  endTime: string
  speciality: string
  appointmentId: string
  fortuneTellerId: string
  customerId: string
  isCustomer: boolean
  showReport: () => void
}) {
  const [stageName, setStageName] = useState("")
  const [isReview, setIsReview] = useState(false)
  const [isShowReview, setIsShowReview] = useState(false)

  useEffect(() => {
    const getDetail = async () => {
      const response = await FortuneTellerService.getFortuneTellerDetail(props.fortuneTellerId)
      const stageName = response.stageName
      const isReview = await AppointmentService.getIsReview(props.appointmentId, props.customerId)

      setStageName(stageName)
      setIsReview(isReview)
    }

    getDetail()
  })

  const showReview = () => {
    setIsShowReview(true)
  }

  const getCompleteEventInfo = () => {
    if (props.isCustomer) {
      const content = (
        <>
          <h1 className="text-mdd-yellow600 font-semibold text-[28px]">การดูดวงเสร็จสิ้น</h1>
          <p className="text-mdd-gray-success-text">
            หากมีข้อติชมหรือปัญหาที่เกี่ยวข้อง โปรดกดปุ่ม <br /> ขอขอบคุณที่ใช้บริการ ‘{stageName}’
          </p>
        </>
      )
      const moreContent = ""
      const button = (
        <div className="flex flex-row">
          {!isReview && (
            <button
              className="h-[37px] rounded-[10px] px-2 text-white bg-[#DEAA6B]"
              onClick={showReview}
            >
              รีวิวหมอดู
            </button>
          )}

          <button
            className="h-[37px] rounded-[10px] px-2 text-white bg-[#FF5656] mx-1"
            onClick={props.showReport}
          >
            รายงานหมอดู
          </button>
        </div>
      )
      return { content, moreContent, button }
    } else {
      const content = (
        <>
          <h1 className="text-mdd-yellow600 font-semibold text-[28px]">การดูดวงเสร็จสิ้น</h1>
          <p className="text-mdd-gray-success-text">
            หากตรวจสอบไม่พบปัญหาใด <br /> เงินจะถูกโอนเข้าบัญชีของคุณใน 1 วัน
          </p>
        </>
      )
      const moreContent = ""
      const button = null
      return { content, moreContent, button }
    }
  }

  const { content, moreContent, button } = getCompleteEventInfo()

  return (
    <>
      <ReviewModal
        isShowComplete={isShowReview}
        setIsShowComplete={setIsShowReview}
        isCustomer={props.isCustomer}
        customerId={props.customerId}
        fortuneTellerId={props.fortuneTellerId}
        appointmentId={props.appointmentId}
      />

      <BaseAppointmentCard
        icon={<CompleteEventIcon />}
        content={content}
        moreContent={moreContent}
        button={button}
        formattedDate={props.formattedDate}
        startTime={props.startTime}
        endTime={props.endTime}
        speciality={props.speciality}
      />
    </>
  )
}
