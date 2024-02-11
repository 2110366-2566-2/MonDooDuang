import AppointmentButton from "./AppointmentButton"
import packageListIcon from "../../../../assets/fortunTellerDetailsAsssets/packageListIcon.png"
import priceIcon from "../../../../assets/fortunTellerDetailsAsssets/priceIcon.svg"
import { PackageTypes } from "../../types/PackageTypes"

export default function PackageList({ packageItem }: { packageItem: PackageTypes }) {

    function translate(specialty :string){
        if(specialty === "TAROT_CARD") return "ไพ่ทาโร่"
        else if(specialty === "THAI") return "โหราศาสตร์ไทย"
        else if(specialty === "NUMBER") return "ศราตร์ตัวเลข"
        else if(specialty === "ORACLE") return "ไพ่ออราเคิล"
        else return "อักษรรูน"
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