import Star from "../../../../assets/FortuneTellerAccountAssets/Star.png"
import Coin from "../../../../assets/FortuneTellerAccountAssets/Coin.png"
import EditIcon from "../../../../assets/FortuneTellerAccountAssets/EditIcon.svg"
export default function FortunePackage() {
  return (
    <div>
      {/* <div className="cursor-pointer pb-12 text-xl text-center font-regular my-auto items-center">
        ขณะนี้ยังไม่มี Package การดูดวง
      </div> */}
      <div className="grid grid-cols-2 gap-10 m-10">
        <div className="rounded-2xl bg-white bg-opacity-[.27] flex flex-col h-56 py-4 pr-3.5">
          <div className="flex flex-row ml-7 w-full">
            <img src={Star} className="size-9" />
            <span
              className="
            font-semibold text-4xl ml-3.5"
            >
              ไพ่ทาโรต์
            </span>
            <img
              src={EditIcon}
              className="size-6 text-white top-0 right-0 cursor-pointer"
              onClick={() => (window.location.href = "/account/fortuneteller/package")}
            />
          </div>
          <div className="flex flex-row ml-16">
            <img src={Coin} className="mr-3.5 size-8" />
            <p className="text-[#FFE176] font-medium text-3xl">300</p>
            <p className="text-[#FFE176] font-medium text-3xl">&nbsp;บาท</p>
          </div>
          <div className="flex flex-row ml-11">
            <p className="text-lg">ใช้เวลาโดยประมาณ :&nbsp;</p>
            <p className="text-lg">1 ชั่วโมง</p>
          </div>
          <div className="flex flex-row ml-11">
            <p className="text-lg">รายละเอียด :&nbsp;</p>
            <p className="text-lg text-wrap"></p>
          </div>
        </div>
      </div>
    </div>
  )
}
