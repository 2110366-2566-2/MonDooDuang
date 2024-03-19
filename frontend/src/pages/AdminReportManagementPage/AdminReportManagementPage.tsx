import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../common/providers/AuthProvider"
import NavBarAdmin from "../../common/components/NavBar/NavBarAdmin"
import { PageLine } from "./components/Icon"
import ReportCard from "./components/ReportCard"
import { ReportInfoType } from "./types/ReportInfoType"
import { ReportManagementService } from "./services/ReportManagementService"

export default function AdminReportManagementPage() {
  const { username } = useContext(AuthContext)
  const highlight = "font-semibold text-mdd-focus-yellow cursor-pointer ease-in-out duration-500"
  const unhighlight = "opacity-50 text-white cursor-pointer ease-in-out duration-500"

  const defualtMenuList = [
    "รายงานหมอดูไม่มาตามนัดหมาย",
    "รายงานพฤติกรรมที่ไม่เหมาะสม",
    "รายงานเกี่ยวกับระบบ"
  ]

  const [behaviorReports, setBehaviorReports] = useState<ReportInfoType[]>([])
  const [moneyReports, setMoneyReports] = useState<ReportInfoType[]>([])
  const [systemReports, setSystemReports] = useState<ReportInfoType[]>([])
  const [menuList, setMenuList] = useState(defualtMenuList)
  const [focusReports, setFocusReports] = useState<ReportInfoType[]>([])

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const requests = await ReportManagementService.getAllReport()

        if (requests) {
          const behaviorReportData = requests.filter(
            (report: ReportInfoType) => report.reportType === "INAPPROPRIATE_BEHAVIOR"
          )
          setBehaviorReports(behaviorReportData)
          const moneyReportData = requests.filter(
            (report: ReportInfoType) => report.reportType === "MONEY_SUSPENSION"
          )
          setMoneyReports(moneyReportData)
          const systemReportData = requests.filter(
            (report: ReportInfoType) => report.reportType === "SYSTEM_ERROR"
          )
          setSystemReports(systemReportData)
          setFocusReports(behaviorReportData)
        }
      } catch (err) {
        console.log(err)
      }
    }
    fetchReports()
  }, [])

  const menuHandler = (focusIndex: number) => {
    if (focusIndex === 1) {
      return
    }
    const newMenuHandler = ["", "", ""]
    menuList.map((menu: string, index: number) => {
      if (focusIndex === 0) {
        newMenuHandler[(index + 1) % menuList.length] = menu
      } else {
        newMenuHandler[(index + 2) % menuList.length] = menu
      }
    })
    if (menuList[focusIndex] === "รายงานหมอดูไม่มาตามนัดหมาย") {
      setFocusReports(moneyReports)
    } else if (menuList[focusIndex] === "รายงานพฤติกรรมที่ไม่เหมาะสม") {
      setFocusReports(behaviorReports)
    } else {
      setFocusReports(systemReports)
    }
    setMenuList(newMenuHandler)
  }

  return (
    <>
      <NavBarAdmin menuFocus={"reportManagement"} username={username} />
      <div className="px-20 py-8">
        <div className="w-auto h-auto">
          <div className="flex flex-col justify-items-center items-center space-y-8">
            <div className="mt-10 text-white text-4xl font-noto-sans">จัดการคำร้องผู้ใช้</div>
            <div className="flex justify-items-center items-center text-xl font-noto-sans w-fit space-x-8">
              {menuList.map((menu, index) => (
                <>
                  <div
                    className={`w-[300px] h-[30px] justify-items-center items-center ${
                      index === 1 ? highlight : unhighlight
                    }`}
                    onClick={() => menuHandler(index)}
                    key={index}
                  >
                    <div className="text-center">{menu}</div>
                  </div>
                </>
              ))}
            </div>
            <PageLine />
            <div className={`overflow-y-auto flex-grow-0 h-[480px]`}>
              {focusReports ? (
                <div
                  className={`flex flex-row max-w-[1500px] justify-between flex-wrap content-around px-16 py-4 m-4 ${
                    focusReports.length === 2 ? "space-x-8" : ""
                  }`}
                >
                  {focusReports.map((report: ReportInfoType) => (
                    <ReportCard report={report} />
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
