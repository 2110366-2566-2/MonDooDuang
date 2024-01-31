export default function ReportModal() {
  return (
    <>
      <div className="w-screen h-screen bg-mdd-overlay-grey bg-opacity-50 fixed top-0 left-0 z-[2] flex justify-center items-center">
        <div className="w-[28vw] h-[20vw] bg-mdd-silver-grey rounded-[2vw] py-1 flex flex-col justify-evenly items-center">
          <div className="flex flex-col justify-center items-center">
            <div className="font-semibold text-2xl">รายงานปัญหา</div>
            <div className="font-normal text-sm text-mdd-grey">กรุณาเลือกปัญหาที่ต้องการรายงาน</div>
          </div>
          <form id="report-form" className="font-normal text-base">
            <label>
              <input type="radio" name="report-type" id="no-show" value="no-show" />
              ไม่มาตามนัดหมาย
            </label>
            <br />
            <label>
              <input type="radio" name="report-type" id="spam" value="spam" />
              สแปม
            </label>
            <br />
            <label>
              <input
                type="radio"
                name="report-type"
                id="sexual-harassment"
                value="sexual-harassment"
              />
              คุกคามทางเพศ
            </label>
            <br />
            <label>
              <input
                type="radio"
                name="report-type"
                id="inappropriate-behavior"
                value="inappropriate-behavior"
              />
              สร้างความรบกวน
            </label>
            <br />
            <label>
              <input type="radio" name="report-type" id="others" value="others" />
              อื่น ๆ
            </label>
            <input
              className="bg-transparent"
              type="text"
              id="description"
              placeholder="โปรดระบุ................"
            />
            <br />
          </form>
          <div className="w-full flex justify-evenly items-center">
            <button className="w-[30%] py-[0.5vw] bg-mdd-dark-grey text-white rounded-lg ">
              ยกเลิก
            </button>
            <button
              className="w-[30%] py-[0.5vw] bg-mdd-sand-yellow text-mdd-silver-grey rounded-lg"
              type="submit"
              form="report-form"
            >
              รับทราบและส่ง
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
