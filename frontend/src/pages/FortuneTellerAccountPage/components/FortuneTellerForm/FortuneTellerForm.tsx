import { useEffect, useState } from "react"
import { environment } from "../../../../common/constants/environment"
import EditIcon from "../../../../assets/FortuneTellerAccountAssets/EditIcon.png"
import { FortuneTellerService } from "../../services/FortuneTellerService"
import { PackageTypes } from "../../types/PackageTypes"
import FortuneTellerPackage from "../FortuneTellerPackage/FortuneTellerPackage"

export default function FortuneTellerForm(props: { fortuneTellerId: string }) {
  const [editState, setEditState] = useState(false)
  const [stageName, setStageName] = useState("")
  const [description, setDescription] = useState("")
  const [isStageNameValid, setIsStageNameValid] = useState(true)
  const [fortuneTellerPackage, setFortuneTellerPackage] = useState<PackageTypes[]>()

  //get fortune teller's detail at the beginning
  useEffect(() => {
    const fetchFortuneTellerDetail = async () => {
      const response = await FortuneTellerService.getFortuneTellerDetail(props.fortuneTellerId)
      const stageName = response.stageName
      const description = response.description

      setStageName(stageName)
      setDescription(description)
    }
    fetchFortuneTellerDetail()
  }, [])

  //fetch all package from fortuneTellerId
  useEffect(() => {
    const fetchFortuneTellerPackage = async () => {
      const response = await FortuneTellerService.getPackageIncludeIdByFortuneTellerId(
        props.fortuneTellerId
      )
      const fortuneTellerPackage = await response

      setFortuneTellerPackage(fortuneTellerPackage)
    }
    fetchFortuneTellerPackage()
  }, [])

  //update fortune teller's detail after click 'เสร็จสิ้น'
  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const stagenameValid = await FortuneTellerService.getStageNameValid(
      props.fortuneTellerId,
      stageName
    )
    if (stagenameValid) {
      const response = await FortuneTellerService.updateFortuneTellerDetail(
        props.fortuneTellerId,
        description,
        stageName
      )
      if (!response.isSuccess) {
        return alert(response.message)
      }
      window.location.href = "/account/fortuneteller"
    } else {
      setIsStageNameValid(false)
    }
  }

  // go to package Page for creating new package
  const createPackage = () => {
    window.location.href = environment.frontend.url + "/account/fortuneteller/package"
  }

  return (
    <div className="text-white">
      <button
        className="cursor-pointer ml-9 mt-10 leading-normal font-semibold text-2xl"
        onClick={() => (window.location.href = "/search")}
      >
        &lt; กลับสู่หน้าหลัก
      </button>

      <div className="flex flex-col">
        <div className="flex flex-row items-center justify-between w-full px-16">
          <div className="w-32"></div>
          <span className="font-medium text-4xl">ข้อมูลส่วนตัว</span>

          {editState ? (
            <div className="w-32"></div>
          ) : (
            <button
              className="cursor-pointer float-right bg-white bg-opacity-70 text-[#3B3B3B] rounded-xl w-32 h-12 font-semibold text-2xl "
              onClick={() => {
                setEditState(true)
              }}
            >
              <span className="align-middle inline-block mr-1">แก้ไข</span>
              <img src={EditIcon} className="size-7 align-middle inline-block" />
            </button>
          )}
        </div>

        <div className="font-regular flex flex-row mt-10 w-3/4 mx-auto">
          <div className="mr-20 w-1/3">
            <form id="completeSubmit" onSubmit={submitForm}>
              <label className="pl-2.5 text-2xl leading-normal ">ชื่อในวงการ</label>

              <input
                type="text"
                value={stageName}
                className={`bg-white bg-opacity-50 placeholder-white placeholder-opacity-75 rounded-xl w-full h-12 pl-8 text-xl leading-normal ${
                  editState ? "cursor-text" : "cursor-not-allowed"
                }`}
                disabled={!editState}
                onChange={(e) => setStageName(e.target.value)}
              ></input>
            </form>
            {!isStageNameValid && <span className="text-red-500 text-xs">ชื่อนี้ถูกใช้ไปแล้ว</span>}
          </div>

          <div className="w-7/12">
            <label className="pl-2.5 text-2xl leading-normal">รายละเอียด</label>

            <input
              type="text"
              value={description}
              className={`bg-white bg-opacity-50 placeholder-white placeholder-opacity-75 rounded-xl w-full h-12 pl-8 text-xl leading-normal ${
                editState ? "cursor-text" : "cursor-not-allowed"
              }`}
              disabled={!editState}
              onChange={(e) => setDescription(e.target.value)}
            ></input>
          </div>
        </div>

        <label className="font-medium text-4xl text-center mt-11">Package</label>

        <div className="w-3/4 min-h-60 bg-transparent mx-auto rounded-3xl mt-3.5 flex flex-col border">
          <button
            className=" self-end bg-[#76AA7B] w-24 h-10 rounded-xl text-xl mt-4 mr-5 font-medium leading-normal"
            onClick={() => {
              {
                createPackage()
              }
            }}
          >
            เพิ่ม
          </button>

          <div className="h-full my-auto">
            {!fortuneTellerPackage ? (
              <div className="cursor-pointer pb-12 text-xl text-center font-regular my-auto items-center">
                ขณะนี้ยังไม่มี Package การดูดวง
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-10 m-10">
                {fortuneTellerPackage.map((fortuneTellerPackage) => (
                  <FortuneTellerPackage
                    fortuneTellerPackage={fortuneTellerPackage}
                  ></FortuneTellerPackage>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className={`w-full flex ${editState ? "justify-end" : "justify-start"}`}>
          {editState ? (
            <button
              className="cursor-pointer mr-14 mb-12 mt-8 bottom-0 right-0 w-36 h-10 text-[#3B3B3B] bg-white rounded-xl font-semibold leading-normal text-2xl"
              form="completeSubmit"
            >
              เสร็จสิ้น
            </button>
          ) : (
            <button
              className="cursor-pointer ml-14 mb-12 mt-8 bottom-0 w-36 h-10 text-[#3B3B3B] bg-white rounded-xl font-semibold leading-normal text-2xl"
              onClick={() => (window.location.href = "/account")}
            >
              &lt; ย้อนกลับ
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
