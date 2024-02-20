import { useEffect, useState } from "react"
import EditIcon from "../../../../assets/FortuneTellerAccountAssets/EditIcon.png"
import { FortuneTellerService } from "../../services/FortuneTellerService"

export default function Form(props: { fortuneTellerId: string }) {
  const [editState, setEditState] = useState(false)
  const [fortuneTellerStageName, setFortuneTellerStageName] = useState<string>()
  const [fortuneTellerDescription, setFortuneTellerDescription] = useState<string>()

  useEffect(() => {
    const fetchFortuneTellerDetail = async () => {
      const response = await FortuneTellerService.getFortuneTellerDetail(props.fortuneTellerId)
      const fortuneTellerStageName = response.stageName
      const fortuneTellerDescription = response.description

      setFortuneTellerStageName(fortuneTellerStageName)
      setFortuneTellerDescription(fortuneTellerDescription)
    }
    fetchFortuneTellerDetail()
  }, [])

  // useEffect(() => {
  //   const fetchPackage = async () => {
  //     try {
  //       const requests = await FortuneTellerService.getFortuneTellerPackage(props.fortuneTellerId)

  //       if (requests) {
  //         setFortuneTellerPackage(requests)
  //       }
  //     } catch (err) {
  //       console.log(err)
  //     }
  //   }
  //   fetchPackage()
  // }, [])

  // const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault()
  //   const response = await FortuneTellerService.updateFortuneTellerDetail(
  //     props.fortuneTellerId,
  //     stageName,
  //     description
  //   )

  //   if (!response.isSuccess) {
  //     return alert(response.message)
  //   }
  // }

  return (
    <div className="text-white">
      <button
        className="cursor-pointer ml-9 mt-10 "
        onClick={() => (window.location.href = "/search")}
      >
        &lt; กลับสู่หน้าหลัก
      </button>

      <div className="flex flex-col">
        <div className="flex flex-row items-center justify-between w-full px-16">
          <div className="w-32"></div>
          <span className="font-medium text-4xl ">ข้อมูลส่วนตัว</span>

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
            {/* onSubmit={submitForm} */}
            <form id="completeSubmit">
              <label className="pl-2.5">ชื่อในวงการ</label>
              <br />

              <input
                type="text"
                placeholder={fortuneTellerStageName}
                className={`bg-white bg-opacity-50 placeholder-white rounded-xl w-full h-12 pl-8 ${
                  editState ? "cursor-pointer" : ""
                }`}
                disabled={!editState}
                onChange={(e) => setFortuneTellerStageName(e.target.value)}
              ></input>
            </form>
          </div>

          <div className="w-7/12">
            <label className="pl-2.5">รายละเอียด</label>
            <br />
            <input
              type="text"
              placeholder={fortuneTellerDescription}
              className={`bg-white placeholder-white bg-opacity-50 rounded-xl w-full h-12 pl-8 ${
                editState ? "cursor-pointer" : ""
              }`}
              disabled={!editState}
              onChange={(e) => setFortuneTellerDescription(e.target.value)}
            ></input>
          </div>
        </div>

        <label className="font-medium text-4xl text-center mt-11">Package</label>

        <div className="w-3/4 min-h-60 bg-transparent mx-auto rounded-3xl mt-3.5 flex flex-col border">
          <button
            className=" self-end bg-[#76AA7B] w-24 h-10 rounded-xl text-xl mt-4 mr-5"
            onClick={() => (window.location.href = "/account/fortuneteller/package")}
          >
            เพิ่ม
          </button>

          <div className="h-full my-auto">
            <div className="cursor-pointer pb-12 text-xl text-center font-regular my-auto items-center">
              ขณะนี้ยังไม่มี Package การดูดวง
            </div>
            {/* {fortuneTellerPackage.length === 0 ? (
              <div className="cursor-pointer pb-12 text-xl text-center font-regular my-auto items-center">
                ขณะนี้ยังไม่มี Package การดูดวง
              </div>
            ) : null}
            {fortuneTellerPackage.map((req: PackageType) => {
              return <FortuneTellerPackage fortuneTellerPackage={req} />
            })} */}
          </div>
        </div>

        <div className={`w-full flex ${editState ? "justify-end" : "justify-start"}`}>
          {editState ? (
            <button
              className="cursor-pointer mr-14 mb-12 mt-8 bottom-0 right-0 w-36 h-10 text-[#3B3B3B] bg-white rounded-xl font-semibold"
              form="completeSubmit"
            >
              เสร็จสิ้น
            </button>
          ) : (
            <button
              className="cursor-pointer ml-14 mb-12 mt-8 bottom-0 w-36 h-10 text-[#3B3B3B] bg-white rounded-xl font-semibold"
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
