import { useState } from "react"
import ReportChoice from "./ReportChoice"
import { ReportService } from "../services/ReportService"

export default function ReportModal(props: {
  isShowReport: boolean
  setIsShowReport: React.Dispatch<React.SetStateAction<boolean>>
  isCustomer: boolean
  userId: string
  conversationId: string | null
  isSystemReport: boolean
}) {
  const [reportId, setReportId] = useState("")
  const [reportDescription, setReportDescription] = useState("")
  const [text, setText] = useState("")

  const closeReportModal = () => {
    props.setIsShowReport(false)
    setReportId("")
    setReportDescription("")
    setText("")
  }

  const reportChoices = [
    { type: "no-show", description: "ไม่มาตามนัดหมาย" },
    { type: "spam", description: "สแปม" },
    { type: "sexual-harassment", description: "คุกคามทางเพศ" },
    { type: "inappropriate-behavior", description: "สร้างความรบกวน" },
    { type: "others", description: "อื่น ๆ" }
  ]

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (reportId === "") {
      alert("Please fill in the report form")
      return
    }

    // If no-show, type = MONEY_SUSPENSION, else depends on the type of report modal
    const reportType: ReportType =
      reportId === "no-show"
        ? "MONEY_SUSPENSION"
        : props.isSystemReport
          ? "SYSTEM_ERROR"
          : "INAPPROPRIATE_BEHAVIOR"

    const reporteeId =
      reportType === "SYSTEM_ERROR"
        ? null
        : await ReportService.getReporteeId(props.conversationId, props.userId)

    const response = await ReportService.createReport(
      reportDescription,
      reportType,
      props.userId,
      reporteeId
    )

    if (!response.isSuccess) {
      return alert(response.message)
    }

    closeReportModal()
  }

  return (
    <div
      className={`w-screen h-screen bg-mdd-overlay-grey bg-opacity-50 font-sans fixed top-0 left-0 z-[2] ${props.isShowReport ? "flex" : "hidden"
      } justify-center items-center`}
    >
      <div
        className={`w-[28vw] ${props.isSystemReport ? "h-[15vw]" : "h-[20vw]"
        }  bg-mdd-silver-grey rounded-[2vw] py-1 flex flex-col justify-evenly items-center`}
      >
        <div className="flex flex-col justify-center items-center">
          <div className="font-semibold text-2xl">รายงานปัญหา</div>
          <div className="font-normal text-sm text-mdd-grey">กรุณาเลือกปัญหาที่ต้องการรายงาน</div>
        </div>
        <form id="report-form" onSubmit={submitForm} className="font-normal text-base">
          {reportChoices
            .filter(
              (data) =>
                // 1. filter choices by the user type: customer or fortune teller
                (props.isCustomer || data.type != "no-show") &&
                // 2. filter choices by the report type: system report or not
                (!props.isSystemReport || data.type === "no-show" || data.type === "others")
            )
            .map((data, index) => {
              return (
                <ReportChoice
                  key={index}
                  id={data.type}
                  description={data.description}
                  reportId={reportId}
                  setReportId={setReportId}
                  reportDescription={reportDescription}
                  setReportDescription={setReportDescription}
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
            className="w-[30%] py-[0.5vw] bg-mdd-sand-yellow text-mdd-silver-grey rounded-lg hover:bg-mdd-sand-yellow-hover"
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
