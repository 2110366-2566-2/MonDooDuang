import { useState } from 'react'

export default function BaseAppointmentCard({
  icon,
  content,
  moreContent,
  button,
  formattedDate,
  startTime,
  endTime,
  speciality
}: {
  icon: React.ReactNode
  content: React.ReactNode
  moreContent: string
  button: React.ReactNode
  formattedDate: string
  startTime: string
  endTime: string
  speciality: string
}) {
  const [isSeeMore, setIsSeeMore] = useState(false)
  
  return (
    <>
      <div className={`w-[72vw] flex flex-row ${isSeeMore ? "h-44" : "h-28"} bg-white m-auto mb-[20px] py-[10px] items-start justify-between`}>
        <div className="flex flex-row">
          {icon}
          <div className="flex flex-col">
            {content}
            {isSeeMore && <p className="text-[14px] text-mdd-cancel-red">{moreContent}</p>}
            {isSeeMore && <>
              <p>การดูดวงประเภท  <span className="text-mdd-yellow600 font-semibold">{speciality}</span></p>
              <p>ในวันที่ {formattedDate} เวลา {startTime} - {endTime} น.</p>
            </>}
          </div>
        </div>
        <div className="flex flex-row items-center">
          {button}
          <div className="w-[100px] flex flex-col cursor-pointer justify-center items-center mx-5" onClick={() => setIsSeeMore(!isSeeMore)}>
            <p className="text-mdd-gray-success-text">{isSeeMore ? "see less" : "see more"}</p>
            <div className={`w-0 h-0 border-l-[15px] border-l-transparent border-b-[15px] 
          border-b-mdd-gray-success-text-500 border-r-[15px] border-r-transparent ${isSeeMore ? "transform rotate-180" : ""}`}></div>
          </div>
        </div>
      </div>
    </>
  )
}
