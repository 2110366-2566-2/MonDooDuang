import { useState } from "react"
import UploadFile from "../../../../assets/FortuneTellerRegisterAssets/UploadFile.png"
import CompleteModal from "../Popup/CompleteModal"
import { FortuneTellerRegisterService } from "../../services/FortuneTellerRegisterService"

export default function FormRegister(props: { userId: string }) {
  const [idNumber, setIdNumber] = useState("")
  const [isIdNumberError, setIsIdNumberError] = useState(false)
  const [isPolicyError, setIsPolicyError] = useState(false)
  const [isShowComplete, setIsShowComplete] = useState(false)
  const [file, setFile] = useState("a")
  const [isFileError, setIsFileError] = useState(false)

  // for validate information
  const validation = ({ idNumber }: { idNumber: string; file: string }): boolean => {
    const tempNumber = Number(idNumber)
    const checkNumber = !isNaN(tempNumber)
    const checkLength = idNumber.length == 13
    const checkbox = document.getElementById("policy") as HTMLInputElement | null
    const isCheck = checkbox?.checked ? true : false
    const checkFile = file != ""

    setIsIdNumberError(!checkNumber || !checkLength)
    setIsPolicyError(!isCheck)
    setIsFileError(!checkFile)

    return checkNumber && checkLength && isCheck && checkFile
  }

  // submit button
  const SubmitRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (validation({ idNumber, file }) && !isPolicyError) {
      setIsShowComplete(true)
      // check is userId is exist in fortune_teller before
      const isIdExist = await FortuneTellerRegisterService.getFortuneTellerValid(props.userId)
      if (isIdExist) {
        const response = await FortuneTellerRegisterService.updateFortuneTeller(
          props.userId,
          idNumber,
          file
        )
        if (!response.isSuccess) {
          return alert(response.message)
        }
      } else {
        const response = await FortuneTellerRegisterService.createFortuneTeller(
          props.userId,
          idNumber,
          file
        )
        if (!response.isSuccess) {
          return alert(response.message)
        }

        const res = await FortuneTellerRegisterService.createFortuneTellerRequest(props.userId)

        if (!res.isSuccess) {
          return alert(response.message)
        }
      }
    }
    return
  }

  return (
    <div>
      <div>
        <form className="text-2xl text-white pt-3 flex flex-col">
          <label htmlFor="idNumber">เลขบัตรประจำตัวประชาชน</label>
          <input
            type="text"
            id="idNumber"
            name="idNumber"
            className="pl-7 w-1/2 h-12 rounded-lg bg-white/55 text-white"
            onChange={(e) => setIdNumber(e.target.value)}
          />
        </form>
        {isIdNumberError && (
          <span className="text-red-500 text-xs">
            เลขบัตรประจำตัวประชาชนควรเป็นตัวเลขและมี 13 หลัก
          </span>
        )}
      </div>

      <div className="text-2xl pt-3 flex flex-col w-4/6 relative h-60">
        <form>
          <label htmlFor="fileForm">ภาพบัตรประจำตัวประชาชน(สามารถอัปโหลดได้ 1 ไฟล์เท่านั้น)</label>
          <div className="relative flex flex-col items-center">
            <input
              id="fileForm"
              name="fileForm"
              className="absolute top-0 w-full h-60 rounded-lg bg-white/55  "
              onChange={(e) => setFile(e.target.value)}
            />

            <label className="absolute top-10 flex flex-col items-center">
              <img src={UploadFile} className="size-32" />
              <span className="mx-auto  justify-self-center">
                ลากไฟล์และวางที่นี่ หรือ <u className="font-semibold ">คลิก</u>
                เพื่ออัพโหลดไฟล์
              </span>
            </label>
          </div>
        </form>
        {isFileError && <span className="text-red-500 text-xs">กรุณาแนบไฟล์</span>}
      </div>

      <div>
        <form className="text-2xl pt-32" id="fortune-form" onSubmit={SubmitRegister}>
          <input
            type="checkbox"
            className="size-7 align-middle border-2 border-white accent-gray-50/50"
            id="policy"
            name="policy"
          />
          <label className="ml-2.5 align-middle" htmlFor="policy">
            ฉันรับทราบและยอมรับ{" "}
            <a
              className="underline font-semibold "
              href="https://www.ratchakitcha.soc.go.th/DATA/PDF/2562/A/069/T_0052.PDF"
            >
              นโยบายความเป็นส่วนตัว
            </a>
          </label>
        </form>

        {isPolicyError && <span className="text-red-500 text-xs">กรุณายอมรับข้อตกลง</span>}
      </div>

      <div className="font-semibold text-right ">
        <button
          type="submit"
          form="fortune-form"
          className="text-xl rounded-xl bg-white text-[#3B3B3B] w-32 h-12 cursor-pointer font-semibold bottom-0 right-0 mr-14"
        >
          เสร็จสิ้น
        </button>
        <CompleteModal isShowComplete={isShowComplete} setIsShowComplete={setIsShowComplete} />
      </div>
    </div>
  )
}
