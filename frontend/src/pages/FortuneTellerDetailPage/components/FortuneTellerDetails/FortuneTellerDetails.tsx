import FortuneTellerPicture from "./FortuneTellerPicture"
import ChatIcon from "./ChatIcon"
import FortuneTellerPictureBlur from "./FortuneTellerPictureBlur"
import RatedStar from "./RatedStar"

export default function FortuneTellerDetails() {
    return (
      <div className="w-[40%] relative flex flex-wrap justify-center self-start min-w-[550px]">
        <div className="py-10">
          <div className="relative z-40 ml-[370px]">
          <ChatIcon></ChatIcon>
          </div>
          <div className="relative z-0 w-[100%] mt-[-150px] flex justify-center">
          <FortuneTellerPictureBlur></FortuneTellerPictureBlur>
          <FortuneTellerPicture></FortuneTellerPicture>
          </div>
        </div>
        <div className="text-center">
            <div className="shadow-white font-libre-bodoni text-[40px]">DaengDooDuang</div>
            <div className="flex flex-row justify-center space-x-3 items-end">
              <RatedStar></RatedStar>
              <RatedStar></RatedStar>
              <RatedStar></RatedStar>
              <RatedStar></RatedStar>
              <RatedStar></RatedStar>
              <div className="font-libre-bodoni text-[20px] mb-[-4px]">4.9 / 5</div>
            </div>
            <div className="py-4">
              <div >รายละเอียด</div>
              <div>ไอพวกหมาแดงมันแพ้แมวหยิ่งกันหมด จริงงับ ไม่ว่าจะเป็น มินวอน แจซาน อลันมิน เก้าทิ แจยง</div>
            </div>
        </div>
      </div>
    )
  }