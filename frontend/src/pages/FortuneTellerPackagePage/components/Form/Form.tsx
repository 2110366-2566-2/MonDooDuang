export default function Form() {
  return (
    <div className="text-white">
      <div className="flex flex-col">
        <label className="font-medium text-4xl text-center mt-20 mb-7">ข้อมูล Package</label>

        <div className="w-5/6 min-h-60 bg-transparent mx-auto rounded-3xl border text-regular text-2xl">
          <div className="h-full w-full grid grid-rows-3 grid-flow-col pt-11 gap-y-11 justify-center ">
            <div className="flex flex-col h-full">
              <label className="ml-2.5">ศาสตร์การดูดวง</label>
              <select className="bg-white bg-opacity-[.54] rounded-lg w-5/6 pl-11 h-full text-white">
                <option value=""></option>
                <option value="ไพ่ทาโรต์">ไพ่ทาโรต์</option>
              </select>
            </div>

            <div className="flex flex-col row-span-2">
              <label className="ml-2.5">เวลาที่ใช้โดยประมาณ</label>
              <div>
                <input
                  type="number"
                  className="bg-white bg-opacity-[.54] rounded-lg text-center  w-1/3 h-full"
                ></input>
                <select className="bg-white bg-opacity-[.54] rounded-lg transition-all cursor-pointer ml-2.5 h-full w-1/4 pl-5 ">
                  <option value=""></option>
                  <option value="นาที">นาที</option>
                  <option value="ชั่วโมง">ชั่วโมง</option>
                  <option value="วัน">วัน</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col pb-0">
              <label className="ml-2.5">อัตรการให้บริการ</label>
              <div className="flex flex-row h-full">
                <input
                  type="number"
                  className="bg-white bg-opacity-[.54] rounded-lg text-center w-5/12"
                ></input>
                <span className="ml-5">บาท</span>
              </div>
            </div>

            <div className="flex flex-col row-span-2">
              <label className="ml-2.5">รายละเอียด</label>
              <textarea className="bg-white bg-opacity-[.54] rounded-lg pl-11 w-5/6 mb-12 text-xl"></textarea>
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
          <button className="cursor-pointer float-right mr-14 mb-12 mt-8 bottom-0 right-0 w-36 h-10 text-[#3B3B3B] bg-white rounded-xl font-semibold">
            เสร็จสิ้น
          </button>
        </div>
      </div>
    </div>
  )
}
