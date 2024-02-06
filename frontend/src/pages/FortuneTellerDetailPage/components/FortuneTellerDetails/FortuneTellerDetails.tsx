import FortuneTellerPicture from "./FortuneTellerPicture"
import ChatIcon from "./ChatIcon"

export default function FortuneTellerDetails() {
    return (
      <div className="w-[40%]">
        <FortuneTellerPicture></FortuneTellerPicture>
        <ChatIcon></ChatIcon>
        <div className="text-center">
            <div>DaengDooDuang</div>
            <div>รายละเอียด</div>
            <div>ไอพวกหมาแดงมันแพ้แมวหยิ่งกันหมด จริงงับ
ไม่ว่าจะเป็น มินวอน แจซาน อลันมิน เก้าทิ แจยง</div>
        </div>
      </div>
    )
  }