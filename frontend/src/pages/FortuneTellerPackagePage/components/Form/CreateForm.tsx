import { useState } from "react"
import { Speciality } from "../../types/SpecialityTypes"
import { PackageService } from "../../services/PackageService"

export default function CreateForm(props: { fortuneTellerId: string }) {
  const [fortune, setFortune] = useState<Speciality>()
  const [price, setPrice] = useState(0)
  const [time, setTime] = useState(0)
  const [unitTime, setUnitTime] = useState("")
  const [description, setDescription] = useState("")

  const [isFortuneError, setIsFortuneError] = useState(false)
  const [isPriceError, setIsPriceError] = useState(false)
  const [isTimeError, setIsTimeError] = useState(false)
  const [isUnitTimeError, setIsUnitTimeError] = useState(false)

  // for validate information
  const validation = (): boolean => {
    const checkPrice = Number(price) >= 10 && Number(price) <= 1000000
    const checkTime = Number(time) >= 1
    const checkFortune = fortune !== undefined
    const checkUnitTime = unitTime !== undefined

    setIsFortuneError(!checkFortune)
    setIsPriceError(!checkPrice)
    setIsTimeError(!checkTime)
    setIsUnitTimeError(!checkUnitTime)

    return checkPrice && checkTime
  }

  // after click เสร็จสิ้น
  const SubmitPackage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (validation()) {
      if (fortune) {
        const duration =
          unitTime === "hour" ? time * 60 : unitTime === "day" ? time * 60 * 24 : time
        const response = await PackageService.createPackage(
          fortune,
          description,
          duration,
          price,
          props.fortuneTellerId
        )

        if (!response.isSuccess) {
          return alert(response.message)
        }
        window.location.href = "/account/fortuneteller"
      }
    }
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
                id="fortune"
                name="fortune"
                className="bg-[#C4C4C4] rounded-lg w-11/12 pl-11 h-12 text-white leading-normal"
                onChange={(e) => setFortune(e.target.value as Speciality)}
              >
                <option value="" selected disabled hidden></option>
                <option value="TAROT_CARD">ไพ่ทาโรต์</option>
                <option value="NUMBER">โหราศาตร์ไทย</option>
                <option value="THAI">ศาตร์ตัวเลข</option>
                <option value="ORACLE">ไพ่ออราเคิล</option>
                <option value="RUNES">รูนส์</option>
              </select>
              <div>
                {isFortuneError && (
                  <span className="text-red-500 text-xs">กรุณาระบุศาสตร์การดูดวง</span>
                )}
              </div>
            </div>
            <div className="items-center justify-center">
              <div className="flex flex-col row-span-2">
                <label className="ml-2.5 leading-normal">เวลาที่ใช้โดยประมาณ</label>
                <div>
                  <form id="packageForm" onSubmit={SubmitPackage}>
                    <input
                      type="number"
                      id="time"
                      name="time"
                      className="bg-white bg-opacity-[.54] rounded-lg text-center w-44 h-12 leading-normal"
                      onChange={(e) => setTime(Number(e.target.value))}
                    />

                    <select
                      id="unitTime"
                      name="unitTime"
                      className="bg-[#C4C4C4] rounded-lg cursor-pointer ml-2.5 h-12 w-36 pl-5 leading-normal"
                      onChange={(e) => setUnitTime(e.target.value)}
                    >
                      <option value="" selected disabled hidden></option>
                      <option value="minute">นาที</option>
                      <option value="hour">ชั่วโมง</option>
                      <option value="day">วัน</option>
                    </select>
                  </form>
                </div>
                <div>
                  {(isTimeError || isUnitTimeError) && (
                    <span className="text-red-500 text-xs">กรุณาระบุเวลาและหน่วยเวลา</span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-1/2 md:gap-y-11">
            <div className="items-center justify-center">
              <label className="ml-2.5 leading-normal">อัตราการให้บริการ</label>
              <div className="flex flex-row h-12">
                <input
                  type="number"
                  id="price"
                  name="price"
                  className="bg-white bg-opacity-[.54] rounded-lg text-center w-60 leading-normal"
                  onChange={(e) => setPrice(Number(e.target.value))}
                ></input>
                <span className="ml-5 leading-normal">บาท</span>
              </div>
              <div>
                {isPriceError && (
                  <span className="text-red-500 text-xs">
                    กรุณาระบุราคาที่อยู่ระหว่าง 10 ถึง 1,000,000 บาท
                  </span>
                )}
              </div>
            </div>
            <div className="items-center justify-center">
              <label className="ml-2.5 leading-normal">รายละเอียด</label>
              <textarea
                id="description"
                name="description"
                className="bg-white bg-opacity-[.54] rounded-lg pl-11 w-full min-h-28 text-xl leading-normal py-3.5 pr-2.5"
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
          </div>
        </div>
      </div>
      <div>
        <button
          className="cursor-pointer ml-14 mb-12 mt-8 bottom-0 left-0 w-36 h-10 text-white bg-[#8A8A8A] rounded-xl font-semibold text-2xl leading-normal"
          onClick={() => (window.location.href = "/account/fortuneteller")}
        >
          ย้อนกลับ
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
