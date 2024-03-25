import { specialitiesName } from "../../../SearchPage/types/SpecialityType"

interface AppointmentListDetailProps {
  appointment_date: string
  appointment_start_time: string
  appointment_end_time: string
  event_role: string
  speciality: string
  customer_fname: string
  customer_lname: string
  fortune_teller_name: string
  event_status: string
}
export default function AppointmentListDetail({
  appointment_date, 
  appointment_start_time, 
  appointment_end_time,
  event_role, 
  speciality, 
  customer_fname, 
  customer_lname, 
  fortune_teller_name,
  event_status
}:AppointmentListDetailProps): JSX.Element {
  const showedTime = (time: string) => {
    const [hour, minute, second] = time.split(":")
    return `${hour}:${minute}`
  }
  return (
    <div className="w-full flex flex-row bg-white/[0.94] rounded-xl p-3 my-3">
      <div className={`w-[5px] ${ (event_role === "CUSTOMER") ? "bg-[#E79900]" : "bg-[#417D9F]"} rounded-full mr-3`}></div>
      <div className="w-full flex flex-row justify-between">
        <div className="flex flex-col text-base">
          <div className="flex flex-row">
            <p className="text-[#414141]">นัดหมายดูดวง&nbsp;</p>
            <p className={`${ (event_role === "CUSTOMER") ? "text-[#E79900]" : "text-[#417D9F]"} `}>{specialitiesName[speciality]}&nbsp;</p>
            <p className="text-[#414141]">{event_role === "CUSTOMER" ? "กับ" : "ให้กับ"}&nbsp;</p>
            <p className={`${ (event_role === "CUSTOMER") ? "text-[#E79900]" : "text-[#417D9F]"} `}>{event_role === "CUSTOMER" ? fortune_teller_name : customer_fname + " " + customer_lname[0] + "."}</p>
          </div>
          <div className="flex flex-row font-light">
            <p className="text-[#414141]">ในวันที่&nbsp;</p>
            <p className="text-[#414141]">{new Date(appointment_date).toLocaleDateString('th-TH', {year: 'numeric', month: 'long', day: 'numeric'})}&nbsp;</p>
            <p className="text-[#414141]">เวลา&nbsp;</p>
            <p className={`${ (event_role === "CUSTOMER") ? "text-[#E79900]" : "text-[#417D9F]"} `}>{showedTime(appointment_start_time)} - {showedTime(appointment_end_time)} น.</p>
          </div>
        </div>
        <div className="flex flex-row justify-center place-items-end">
          <p className="font-medium">สถานะ :&nbsp;</p>
          <div className={`${ (event_status === "upcoming")?(event_role === "CUSTOMER") ? "bg-[#E79900]" : "bg-[#417D9F]" : "bg-[#5FAE67]"} text-white px-2 py-[2px] shadow-inner rounded-lg`}>{event_status === "upcoming" ? "นัดหมายสำเร็จ" : "เสร็จสิ้น"}</div>
        </div>
      </div>
    </div>
  )
}