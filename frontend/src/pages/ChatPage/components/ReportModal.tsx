import { useState } from "react"
import ReportChoice from "./ReportChoice"
import { ReportService } from "../services/ReportService"

export default function ReportModal(props: {
  isShowReport: boolean
  setIsShowReport: React.Dispatch<React.SetStateAction<boolean>>
  userId: string
  conversationId: string
}) {
  const [report, setReport] = useState(["", ""])
  const [text, setText] = useState("")

  const closeReportModal = () => {
    props.setIsShowReport(false)
    setReport(["", ""])
    setText("")
  }

  const reportChoices = [
    { id: "no-show", description: "ไม่มาตามนัดหมาย" },
    { id: "spam", description: "สแปม" },
    { id: "sexual-harassment", description: "คุกคามทางเพศ" },
    { id: "inappropriate-behavior", description: "สร้างความรบกวน" },
    { id: "others", description: "อื่น ๆ" }
  ]

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const reportType: ReportType =
      report[0] == "no-show" ? "MONEY_SUSPENSION" : "INAPPROPRIATE_BEHAVIOR"

    const reporteeId = await ReportService.getReporteeId(props.conversationId, props.userId)

    ReportService.createReport(report[1], reportType, "", props.userId, reporteeId)

    closeReportModal()
  }

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
        <form id="report-form" onSubmit={submitForm} className="font-normal text-base">
          {reportChoices.map((data) => {
            return (
              <ReportChoice
                key={data.id}
                id={data.id}
                value={data.id}
                description={data.description}
                report={report}
                setReport={setReport}
                text={text}
                setText={setText}
              />
            )
          })}
        </form>
        <div className="w-full flex justify-evenly items-center">
          <button
            onClick={closeReportModal}
            className="w-[30%] py-[0.5vw] bg-mdd-dark-grey text-white rounded-lg hover:bg-mdd-grey"
          >
            ยกเลิก
          </button>
          <button
            className="w-[30%] py-[0.5vw] bg-mdd-sand-yellow text-mdd-silver-grey rounded-lg hover:bg-mdd-dark-sand"
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
