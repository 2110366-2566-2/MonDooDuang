import AppointmentButton from "./AppointmentButton"
import packageListIcon from "../../../../assets/fortuneTellerDetailsAssets/packageListIcon.png"
import priceIcon from "../../../../assets/fortuneTellerDetailsAssets/priceIcon.svg"
import { PackageTypes, Speciality } from "../../types/PackageTypes"

const specialityMapper: Record<Speciality,string> = {
    TAROT_CARD : "ไพ่ทาโร่",
    THAI : "โหราศาสตร์ไทย",
    NUMBER : "ศราตร์ตัวเลข",
    ORACLE :"ไพ่ออราเคิล",
    RUNES : "ศาสตร์รูนส์"
}

export default function PackageList({ packageItem }: { packageItem: PackageTypes }) {

  function translate(specialty : Speciality){
    return specialityMapper[specialty]
  }

  return (
    <tr className=" border-t-[1px] mt-[-1px] border-white flex items-center space-x-8 justify-between px-4 py-2 ">
      <div className=" space-y-1">
        <div className="flex items-center space-x-2">
          <img src={packageListIcon}></img>
          <h3 className="text-[32px]">{translate(packageItem.speciality)}</h3>
        </div>
        <div className="flex items-center space-x-2">
          <img src={priceIcon}></img>
          <div className="font-medium text-mdd-link-yellow text-[24px]">{packageItem.price} บาท</div>
        </div>
        <div className="font-light text-[16px]">
          <div>เวลาที่ใช้โดยประมาณ : {packageItem.duration} นาที</div>
          <div>รายละเอียด : {packageItem.description}</div>
        </div> 
      </div>
      <AppointmentButton></AppointmentButton>
    </tr>
  )
}