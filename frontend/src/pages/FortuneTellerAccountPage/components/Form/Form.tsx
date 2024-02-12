import EditIcon from "../../../../assets/FortuneTellerAccountAssets/EditIcon.png"
import FortunePackage from "../FortunePackage/FortunePackage"

export default function Form() {
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

          <button className="cursor-pointer float-right bg-white bg-opacity-70 text-[#3B3B3B] rounded-xl w-32 h-12 font-semibold text-2xl ">
            <span className="align-middle inline-block mr-1">แก้ไข</span>
            <img src={EditIcon} className="size-7 align-middle inline-block" />
          </button>
        </div>

        <div className="font-regular flex flex-row mt-10 w-3/4 mx-auto">
          <div className="mr-20 w-1/3">
            <label>ชื่อในวงการ</label>
            <br />
            <input
              type="text"
              className="bg-white bg-opacity-50 rounded-xl w-full h-12 pl-8 cursor-pointer"
            ></input>
          </div>
          <div className="w-7/12">
            <label>รายละเอียด</label>
            <br />
            <input
              type="text"
              className="bg-white bg-opacity-50 rounded-xl w-full h-12 pl-8 cursor-pointer"
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
            <FortunePackage></FortunePackage>
          </div>
        </div>
        <button
          className="cursor-pointer ml-14 mb-12 mt-8 bottom-0 left-0 w-36 h-10 text-[#3B3B3B] bg-white rounded-xl font-semibold"
          onClick={() => (window.location.href = "/account")}
        >
          &lt; ย้อนกลับ
        </button>
      </div>
    </div>
  )
}
