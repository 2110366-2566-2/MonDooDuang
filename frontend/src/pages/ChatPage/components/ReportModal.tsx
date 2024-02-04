import { useState } from "react"
import ReportChoice from "./ReportChoice"

export default function ReportModal(props: {
  isShowReport: boolean
  setIsShowReport: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const [report, setReport] = useState(["", ""])

  return (
    <div
      className={`w-screen h-screen bg-mdd-overlay-grey bg-opacity-50 fixed top-0 left-0 z-[2] ${
        props.isShowReport ? "flex" : "hidden"
      } justify-center items-center`}
    >
      <div className="w-[28vw] h-[20vw] bg-mdd-silver-grey rounded-[2vw] py-1 flex flex-col justify-evenly items-center">
        <div className="flex flex-col justify-center items-center">
          <div className="font-semibold text-2xl">รายงานปัญหา</div>
          <div className="font-normal text-sm text-mdd-grey">กรุณาเลือกปัญหาที่ต้องการรายงาน</div>
        </div>
        <form id="report-form" className="font-normal text-base">
          <ReportChoice
            id="no-show"
            value="no-show"
            description="ไม่มาตามนัดหมาย"
            report={report}
            setReport={setReport}
          />
          <ReportChoice
            id="spam"
            value="spam"
            description="สแปม"
            report={report}
            setReport={setReport}
          />
          <ReportChoice
            id="sexual-harassment"
            value="sexual-harassment"
            description="คุกคามทางเพศ"
            report={report}
            setReport={setReport}
          />
          <ReportChoice
            id="inappropriate-behavior"
            value="inappropriate-behavior"
            description="สร้างความรบกวน"
            report={report}
            setReport={setReport}
          />
          <ReportChoice
            id="others"
            value="others"
            description="อื่น ๆ"
            report={report}
            setReport={setReport}
          />
        </form>
        <div className="w-full flex justify-evenly items-center">
          <button
            onClick={() => props.setIsShowReport(false)}
            className="w-[30%] py-[0.5vw] bg-mdd-dark-grey text-white rounded-lg"
          >
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
  )
}
