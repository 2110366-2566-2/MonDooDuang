import { useState } from "react"

export default function Form() {
  const [fortune, setFortune] = useState("")
  const [price, setPrice] = useState(-1)
  const [time, setTime] = useState(-1)
  const [unitTime, setUnitTime] = useState("")
  const [description, setDescription] = useState("")

  const [isFortuneError, setIsFortuneError] = useState(false)
  const [isPriceError, setIsPriceError] = useState(false)
  const [isTimeError, setIsTimeError] = useState(false)
  const [isUnitTimeError, setIsUnitTimeError] = useState(false)

  // for validate information
  const validation = ({
    fortune,
    price,
    time,
    unitTime
  }: {
    fortune: string
    price: number
    time: number
    unitTime: string
  }): boolean => {
    const checkFortune = fortune != ""
    const checkPrice = Number(price) >= 0
    const checkTime = Number(time) >= 0
    const checkUnit = unitTime != ""

    setIsFortuneError(!checkFortune)
    setIsPriceError(!checkPrice)
    setIsTimeError(!checkTime)
    setIsUnitTimeError(!checkUnit)

    return checkFortune && checkPrice && checkTime && checkUnit
  }

  return (
    <div className="text-white">
      <div className="flex flex-col">
        <label className="font-medium text-4xl text-center mt-20 mb-7">ข้อมูล Package</label>

        <div className="w-5/6 min-h-60 bg-transparent mx-auto rounded-3xl border text-regular text-2xl">
          <div className="h-full w-full grid grid-rows-3 grid-flow-col pt-11 gap-y-11 justify-center ">
            <div className="flex flex-col h-full">
              <label className="ml-2.5">ศาสตร์การดูดวง</label>
              <select
                id="fortune"
                name="fortune"
                className="bg-white bg-opacity-[.54] rounded-lg w-5/6 pl-11 h-full text-white"
                onChange={(e) => setFortune(e.target.value)}
              >
                <option value=""></option>
                <option value="TAROT">ไพ่ยิปซี</option>
                <option value="NUMBER">โหราศาตร์ไทย</option>
                <option value="THAI">ศาตร์ตัวเลข</option>
                <option value="ORACLE">ไพ่ออราเคิล</option>
                <option value="RUNE">รูนส์</option>
                <option value="PHROMAYARN">ไพ่พรหมญาณ</option>
              </select>
              {isFortuneError && (
                <span className="text-red-500 text-xs">กรุณาระบุประเภทศาสตร์การดูดวง</span>
              )}
            </div>

            <div className="flex flex-col row-span-2">
              <label className="ml-2.5">เวลาที่ใช้โดยประมาณ</label>
              <div>
                <form id="packageForm" onSubmit={SubmitPackage}>
                  <input
                    type="number"
                    id="time"
                    name="time"
                    className="bg-white bg-opacity-[.54] rounded-lg text-center  w-1/3 h-full"
                    onChange={(e) => setTime(Number(e.target.value))}
                  />

                  <select
                    id="unitTime"
                    name="unitTime"
                    className="bg-white bg-opacity-[.54] rounded-lg transition-all cursor-pointer ml-2.5 h-full w-1/4 pl-5 "
                    onChange={(e) => setUnitTime(e.target.value)}
                  >
                    <option value=""></option>
                    <option value="minute">นาที</option>
                    <option value="hour">ชั่วโมง</option>
                    <option value="day">วัน</option>
                  </select>
                </form>
              </div>
              {(isTimeError || isUnitTimeError) && (
                <span className="text-red-500 text-xs">กรุณาระบุเวลาและหน่วยเวลา</span>
              )}
            </div>

            <div className="flex flex-col pb-0">
              <label className="ml-2.5">อัตราการให้บริการ</label>
              <div className="flex flex-row h-full">
                <input
                  type="number"
                  id="price"
                  name="price"
                  className="bg-white bg-opacity-[.54] rounded-lg text-center w-5/12"
                  onChange={(e) => setPrice(Number(e.target.value))}
                ></input>
                <span className="ml-5">บาท</span>
              </div>
              {isPriceError && <span className="text-red-500 text-xs">กรุณาระบุราคา</span>}
            </div>

            <div className="flex flex-col row-span-2">
              <label className="ml-2.5">รายละเอียด</label>
              <textarea
                id="description"
                name="description"
                className="bg-white bg-opacity-[.54] rounded-lg pl-11 w-5/6 mb-12 text-xl"
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
          </div>
        </div>
        <div>
          <button
            className="cursor-pointer ml-14 mb-12 mt-8 bottom-0 left-0 w-36 h-10 text-white bg-[#8A8A8A]  rounded-xl font-semibold"
            onClick={() => (window.location.href = "/account/fortuneteller")}
          >
            ย้อนกลับ
          </button>
          <button
            className="cursor-pointer float-right mr-14 mb-12 mt-8 bottom-0 right-0 w-36 h-10 text-[#3B3B3B] bg-white rounded-xl font-semibold"
            form="packageForm"
            onClick={() => {
              if (validation({ fortune, price, time, unitTime })) {
                window.location.href = "/account/fortuneteller"
              }
            }}
          >
            เสร็จสิ้น
          </button>
        </div>
      </div>
    </div>
  )
}
