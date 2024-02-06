import AppointmentButton from "./AppointmentButton"
import packageListIcon from "../../../../assets/fortunTellerDetailsAsssets/packageListIcon.png"
import priceIcon from "../../../../assets/fortunTellerDetailsAsssets/priceIcon.svg"

export default function PackageList() {

    return (
        <tr className=" border-t-[1px] border-white flex items-center mx-2 space-x-8 justify-center py-2">
            <div>
                <div className="flex items-center">
                    <img src={packageListIcon}></img>
                    <h3 className="text-[32px]">ไพ่ทาโรต์</h3>
                </div>
                <div className="flex items-center space-x-2">
                    <img src={priceIcon}></img>
                    <div className="text-mdd-link-yellow text-[24px]">300 บาท</div>
                </div>
                <div className="font-light">
                    <div>เวลาที่ใช้โดยประมาณ : 1 ชั่วโมง 30 นาที</div>
                    <div>รายละเอียด : พี่สาวคนสวยกับม๋าเด่ก</div>
                </div> 
            </div>
            <AppointmentButton></AppointmentButton>
        </tr>
    )
  }