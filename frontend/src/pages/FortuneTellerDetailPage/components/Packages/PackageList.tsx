import AppointmentButton from "./AppointmentButton"
import packageListIcon from "../../../../assets/fortunTellerDetailsAsssets/packageListIcon.png"
import priceIcon from "../../../../assets/fortunTellerDetailsAsssets/priceIcon.svg"
import { PackageTypes } from "../../types/PackageTypes"

export default function PackageList({ packageItem }: { packageItem: PackageTypes }) {

    return (
        <tr className=" border-t-[1px] mt-[-1px] border-white flex items-center space-x-8 justify-between px-4 py-2 ">
            <div>
                <div className="flex items-center">
                    <img src={packageListIcon}></img>
                    <h3 className="text-[32px]">{packageItem.speciality}</h3>
                </div>
                <div className="flex items-center space-x-2">
                    <img src={priceIcon}></img>
                    <div className="text-mdd-link-yellow text-[24px]">{packageItem.price} บาท</div>
                </div>
                <div className="font-light">
                    <div>เวลาที่ใช้โดยประมาณ : {packageItem.duration} นาที</div>
                    <div>รายละเอียด : {packageItem.description}</div>
                </div> 
            </div>
            <AppointmentButton></AppointmentButton>
        </tr>
    )
  }