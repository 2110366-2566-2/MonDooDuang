import { useState } from "react"
import UploadFile from "../../../../assets/FortuneTellerRegisterAssets/UploadFile.png"
// import FileIcon from "../../../../assets/FortuneTellerRegisterAssets/FileIcon.png"
// import CrossIcon from "../../../../assets/FortuneTellerRegisterAssets/CrossIcon.png"

export default function FormRegister() {
  const [idNumber, setIdNumber] = useState("")
  //   const [file,setFile] = useState('')
  //   const [policy, setPolicy] = useState(false)
  const [isIdNumberError, setIsIdNumberError] = useState(false)
  //   const [isFileError,setIsFileError] = useState(false)
  const [isPolicyError, setIsPolicyError] = useState(false)

  // for validate information
  const validation = ({ idNumber }: { idNumber: string }): boolean => {
    const isNumber = Number(idNumber)
    const checkNumber = !isNaN(isNumber)
    const checkLength = idNumber.length == 13
    const checkbox = document.getElementById("policy") as HTMLInputElement | null
    const isCheck = checkbox?.checked ? true : false

    setIsIdNumberError(!checkNumber || !checkLength)
    setIsPolicyError(!isCheck)

    return checkNumber && checkLength && isCheck
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

      <div className="text-2xl pt-3 flex flex-col w-4/6 relative">
        <form>
          <label htmlFor="fileForm">ภาพบัตรประจำตัวประชาชน(สามารถอัปโหลดได้ 1 ไฟล์เท่านั้น)</label>
          <label className="flex flex-col items-center justify-center ">
            <img src={UploadFile} className="size-32  justify-self-center" />
            <span className="mx-auto  justify-self-center">
              ลากไฟล์และวางที่นี่ หรือ <u className="font-semibold ">คลิก</u>
              เพื่ออัพโหลดไฟล์
            </span>
          </label>
          <input id="fileForm" name="fileForm" className="w-full h-60 rounded-lg bg-white/55  " />
        </form>
      </div>

      <div>
        <form className="text-2xl pt-11 ">
          <input
            type="checkbox"
            className="size-7 align-middle border-2 border-white accent-gray-50/50"
            id="policy"
            name="policy"
          />
          <label className="pl-2.5 align-middle" htmlFor="policy">
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

      <div className="font-semibold  text-right mr-32">
        <button
          type="submit"
          className="text-xl rounded-xl bg-white text-gray-800 w-32 h-12 cursor-pointer font-semibold"
          onClick={() => {
            if (validation({ idNumber }) && !isPolicyError) {
            }
          }}
        >
          เสร็จสิ้น
        </button>
      </div>
    </div>
  )
}
