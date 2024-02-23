import Star from "../../../../assets/FortuneTellerAccountAssets/Star.png"
import Coin from "../../../../assets/FortuneTellerAccountAssets/Coin.png"
import EditIcon from "../../../../assets/FortuneTellerAccountAssets/EditIcon.svg"
import { PackageTypes } from "../../types/PackageTypes"

export default function FortuneTellerPackage({
  fortuneTellerPackage
}: {
  fortuneTellerPackage: PackageTypes
}) {
  const timeSeparate = (): [number, string] => {
    let time = Number(fortuneTellerPackage.duration)
    let unit = "นาที"

    if (time >= 1440) {
      time /= 1440
      unit = "วัน"
    } else if (time >= 60) {
      time /= 1440
      unit = "ชั่วโมง"
    }

    return [time, unit]
  }

  const specialityName = (): string => {
    let speciality = fortuneTellerPackage.speciality
    if (speciality === "TAROT_CARD") return "ไพ่ทาโรต์"
    if (speciality === "THAI") return "โหราศาตร์ไทย"
    if (speciality === "NUMBER") return "ศาตร์ตัวเลข"
    if (speciality === "ORACLE") return "ไพ่ออราเคิล"
    return "รูนส์"
  }

  return (
    <div className="rounded-2xl bg-white bg-opacity-[.27] flex flex-col h-56 py-4 pr-3.5">
      <div className="flex flex-row px-2 justify-between w-full">
        <div className="flex flex-row">
          <img src={Star} className="size-9" />
          <span className="font-semibold text-4xl ml-3.5">{specialityName()}</span>
        </div>
        <img
          src={EditIcon}
          className="size-6 text-white top-0 right-0 cursor-pointer"
          // path ไปหา ${fortuneTellerId}/${packageId}/edit
          // onClick={() => (window.location.href = "/account/fortuneteller/package")}
        />
      </div>
      <div className="flex flex-row ml-16">
        <img src={Coin} className="mr-3.5 size-8" />

        <p className="text-[#FFE176] font-medium text-3xl">{fortuneTellerPackage.price} บาท</p>
      </div>
      <div className="flex flex-row ml-11">
        <p className="text-lg">
          ใช้เวลาโดยประมาณ : {timeSeparate()[0]} {timeSeparate()[1]}
        </p>
      </div>
      <div className="flex flex-row ml-11">
        <p className="text-lg text-wrap max-w-full truncate">
          รายละเอียด : {fortuneTellerPackage.description}
        </p>
      </div>
    </div>
  )
}
