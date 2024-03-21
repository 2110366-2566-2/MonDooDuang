import { DefaultProfilePic } from "../../AdminApprovalPage/components/Icon"
import { ReportInfoType } from "../types/ReportInfoType"

export default function ReportCard({ report }: { report: ReportInfoType }) {
  return (
    <div className="w-[650px] h-[200px] bg-white bg-opacity-50 rounded-2xl px-4 py-4 mb-8">
      <div
        className={`flex flex-row ${
          report.reportType === "SYSTEM_ERROR"
            ? "justify-items-start space-x-10"
            : "justify-between"
        } items-center`}
      >
        <div className="rounded-full w-[100px] h-[100px]">
        {report.reporteeProfile ? (
          <img
            src={report.reporteeProfile}
            alt="Profile"
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
              borderRadius: "50%"
            }}
          />
        ) : (
          <DefaultProfilePic />
        )}
      </div>
        <div className="flex flex-col w-[320px] justify-items-center text-md">
          <div className="text-mdd-focus-yellow">Report ID : {report.reportId}</div>
          <div className="text-white">ผู้ถูกรายงาน : {report.reporterName}</div>
          {report.reportType === "SYSTEM_ERROR" ? null : (
            <div className="text-white">รายงานโดย : {report.reporteeName}</div>
          )}
          <div className="text-white">ปัญหาที่ถูกรายงาน : </div>
          <div className="max-h-[120px] text-mdd-cancel-red bg-white bg-opacity-80 rounded px-1 overflow-hidden shadow-inner">
            <div className="overflow-y-auto max-h-[80px]">{report.description}</div>
          </div>
        </div>
        {report.reportType === "MONEY_SUSPENSION" ? (
          <MoneySuspendButton />
        ) : report.reportType === "INAPPROPRIATE_BEHAVIOR" ? (
          <InappropiateButton />
        ) : null}
      </div>
    </div>
  )
}

const InappropiateButton = () => {
  return (
    <div className="flex flex-col items-end justify-items-center space-y-3">
      <button
        onClick={() => {}}
        style={{ transition: "background-color 0.3s" }}
        className="w-[130px] py-1 px-2 justify-items-center items-center rounded-[10px] text-gray-200 text-md bg-mdd-sand-yellow hover:bg-mdd-sand-yellow-hover"
      >
        <div className="text-center">จัดการเรียบร้อย</div>
      </button>

      <button
        onClick={() => {}}
        style={{ transition: "background-color 0.3s" }}
        className="w-[130px]  py-1 px-2 justify-items-center items-center rounded-[10px] text-gray-200 text-md bg-mdd-cancel-red hover:bg-red-600"
      >
        <div className="text-center">แบนผู้ใช้</div>
      </button>
    </div>
  )
}

const MoneySuspendButton = () => {
  return (
    <div className="flex flex-col items-end justify-items-center space-y-3">
      <button
        onClick={() => {}}
        style={{ transition: "background-color 0.3s" }}
        className="w-[130px] py-1 px-2 justify-items-center items-center rounded-[10px] text-gray-200 text-md bg-mdd-sand-yellow hover:bg-mdd-sand-yellow-hover"
      >
        <div className="text-center">คืนเงินให้ลูกค้า</div>
      </button>

      <button
        onClick={() => {}}
        style={{ transition: "background-color 0.3s" }}
        className="w-[130px]  py-1 px-2 justify-items-center items-center rounded-[10px] text-gray-200 text-md bg-mdd-muted-green hover:bg-mdd-muted-green-hover"
      >
        <div className="text-center">จ่ายเงินให้หมอดู</div>
      </button>
    </div>
  )
}
