import { useState } from 'react'
import PaymentIcon from './Icon/paymentIcon'

export default function AppointmentCard({
  date,
  startTime,
  endTime,
  speciality,
  paymentDate,
  paymentTime,
  price
}: {
  date: string
  startTime: string
  endTime: string
  paymentDate: string
  paymentTime: string
  speciality: string
  price: number
}) {
  const [isSeeMore, setIsSeeMore] = useState(false)
  
  return (
    <>
      <div className={`w-[72vw] flex flex-row ${isSeeMore ? "h-44" : "h-28"} bg-white m-auto mb-[20px] py-[10px] items-start justify-between`}>
        <div className="flex flex-row">
          <PaymentIcon />
          <div className="flex flex-col">
            <h1 className="text-mdd-yellow600 font-semibold text-[28px]">กำลังรอการชำระเงิน</h1>
            <p className="text-mdd-gray-success-text">ยอดที่ต้องชำระ {price} บาท <br/> สามารถชำระได้จนถึงวันที่ {paymentDate} เวลา {paymentTime} น.</p>
            {isSeeMore && (
              <>
                <p className="text-[14px] text-mdd-cancel-red">*หากไม่ชำระภายในวันและเวลาที่กำหนด ทางเว็บไซต์ขออนุญาตยกเลิกการนัดหมายดูดวง</p>
                <p>การดูดวงประเภท  <span className="text-mdd-yellow600 font-semibold">{speciality}</span></p>
               
                <p>ในวันที่ {date} เวลา {startTime} - {endTime} น.</p>
              </>
            )}
          </div>
        </div>
        <div className="flex flex-row items-center">
          <button className="h-[37px] rounded-[10px] px-2 text-white bg-mdd-muted-green mx-5" onClick={()=> alert()}>ชำระเงินค่าดูดวง</button>
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
