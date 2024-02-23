import { useState } from "react"
import { Speciality } from "../../types/SpecialityTypes"
import { PackageService } from "../../services/PackageService"
import { useEffect } from "react"

export default function EditForm(props: { fortuneTellerId: string; packageId: string }) {
  const [fortune, setFortune] = useState<Speciality>("TAROT_CARD")
  const [price, setPrice] = useState(0)
  const [time, setTime] = useState(0)
  const [unitTime, setUnitTime] = useState("minute")
  const [description, setDescription] = useState("")

  const [isPriceError, setIsPriceError] = useState(false)
  const [isTimeError, setIsTimeError] = useState(false)

  // get package's data at the beginning
  useEffect(() => {
    const fetchPackageData = async () => {
      const response = await PackageService.getPakageData(props.packageId)
      setFortune(response.speciality)
      setDescription(response.description)
      setPrice(response.price)
      let duration = response.duration

      if (duration >= 1440 && duration % 1440 === 0) {
        duration /= 1440
        setTime(duration)
        setUnitTime("day")
      } else if (duration >= 60 && duration % 60 === 0) {
        duration /= 60
        setTime(duration)
        setUnitTime("hour")
      } else {
        setTime(duration)
      }
    }
    fetchPackageData()
  }, [])

  // for validate information
  const validation = ({ price, time }: { price: number; time: number }): boolean => {
    const checkPrice = Number(price) >= 10 && Number(price) <= 1000000
    const checkTime = Number(time) >= 1

    setIsPriceError(!checkPrice)
    setIsTimeError(!checkTime)

    return checkPrice && checkTime
  }

  // after click เสร็จสิ้น
  const SubmitPackage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (validation({ price, time })) {
      const duration = unitTime === "hour" ? time * 60 : unitTime === "day" ? time * 60 * 24 : time
      const response = await PackageService.updatePackage(
        props.packageId,
        fortune,
        description,
        duration,
        price
      )

      if (!response.isSuccess) {
        return alert(response.message)
      }
      window.location.href = "/account/fortuneteller"
    }
  }

  // after click ลบ
  const deletePackage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const response = await PackageService.deletePackage(props.packageId)
    if (!response.isSuccess) {
      return alert(response.message)
    }
    window.location.href = "/account/fortuneteller"
  }

  return (
    <div className="flex flex-col text-white">
      <label className="font-medium text-4xl text-center leading-normal mt-20 mb-7">
        ข้อมูล Package
      </label>
      <div className="w-5/6 min-h-60 bg-transparent mx-auto rounded-3xl border text-regular text-2xl py-11 px-12">
        <div className="flex flex-col md:flex-row md:gap-x-12 ">
          <div className="flex flex-col w-1/2 md:gap-y-11">
            <div className="items-center justify-center">
              <label className="ml-2.5 leading-normal">ศาสตร์การดูดวง</label>
              <select
                value={fortune}
                className="bg-[#C4C4C4] bg-opacity-[.6] rounded-lg w-11/12 pl-11 h-12 text-white leading-normal"
                onChange={(e) => setFortune(e.target.value as Speciality)}
              >
                <option value="TAROT_CARD">ไพ่ทาโรต์</option>
                <option value="NUMBER">โหราศาตร์ไทย</option>
                <option value="THAI">ศาตร์ตัวเลข</option>
                <option value="ORACLE">ไพ่ออราเคิล</option>
                <option value="RUNES">รูนส์</option>
              </select>
            </div>
            <div className="items-center justify-center">
              <div className="flex flex-col row-span-2">
                <label className="ml-2.5 leading-normal">เวลาที่ใช้โดยประมาณ</label>
                <div>
                  <form id="packageForm" onSubmit={SubmitPackage}>
                    <input
                      type="number"
                      value={time.toString()}
                      className="bg-white bg-opacity-[.54] placeholder-white rounded-lg text-center w-44 h-12 leading-normal"
                      onChange={(e) => setTime(Number(e.target.value))}
                    />

                    <select
                      className="bg-[#C4C4C4] bg-opacity-[.6] rounded-lg cursor-pointer ml-2.5 h-12 w-36 pl-5 leading-normal"
                      onChange={(e) => setUnitTime(e.target.value)}
                    >
                      <option value="minute">นาที</option>
                      <option value="hour">ชั่วโมง</option>
                      <option value="day">วัน</option>
                    </select>
                  </form>
                </div>
                {isTimeError && (
                  <span className="text-red-500 text-xs">กรุณาระบุเวลาและหน่วยเวลา</span>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col w-1/2 md:gap-y-11">
            <div className="items-center justify-center">
              <label className="ml-2.5 leading-normal">อัตราการให้บริการ</label>
              <div className="flex flex-row h-12">
                <form id="packageDeleteForm" onSubmit={deletePackage}>
                  <input
                    type="number"
                    value={price.toString()}
                    className="bg-white bg-opacity-[.54] placeholder-white rounded-lg text-center w-60 leading-normal"
                    onChange={(e) => setPrice(Number(e.target.value))}
                  ></input>
                </form>
                <span className="ml-5 leading-normal">บาท</span>
              </div>
              {isPriceError && (
                <span className="text-red-500 text-xs">
                  กรุณาระบุราคาที่อยู่ระหว่าง 10 ถึง 1,000,000 บาท
                </span>
              )}
            </div>
            <div className="items-center justify-center">
              <label className="ml-2.5 leading-normal">รายละเอียด</label>
              <textarea
                placeholder={description}
                className="bg-white bg-opacity-[.54] placeholder-white rounded-lg pl-11 w-full min-h-28 text-xl leading-normal py-3.5 pr-2.5"
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
          </div>
        </div>
      </div>
      <div>
        <button
          className="cursor-pointer ml-14 mb-12 mt-8 bottom-0 left-0 w-36 h-10 text-white bg-[#FF5656] rounded-xl font-semibold text-2xl leading-normal"
          form="packageDeleteForm"
        >
          ลบ
        </button>
        <button
          className="cursor-pointer float-right mr-14 mb-12 mt-8 bottom-0 right-0 w-36 h-10 text-[#3B3B3B] bg-white rounded-xl font-semibold text-2xl leading-normal"
          form="packageForm"
        >
          เสร็จสิ้น
        </button>
      </div>
    </div>
  )
}
