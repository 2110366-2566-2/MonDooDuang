import { useContext, useState } from "react"
import { AuthContext } from "../../common/providers/AuthProvider"
import NavBarAdmin from "../../common/components/NavBar/NavBarAdmin"
import { PageLine } from "./components/Icon"
import ReportCard from "./components/ReportCard"
import { ReportInfoType } from "./types/ReportInfoType"

export default function AdminReportManagementPage() {
  const { username } = useContext(AuthContext)
  const highlight = "font-semibold text-mdd-focus-yellow cursor-pointer ease-in-out duration-500"
  const unhighlight = "opacity-50 text-white cursor-pointer ease-in-out duration-500"
  let defualtMenuList = [
    "รายงานหมอดูไม่มาตามนัดหมาย",
    "รายงานพฤติกรรมที่ไม่เหมาะสม",
    "รายงานเกี่ยวกับระบบ"
  ]
  //mock data
  const behaviorReportList = [
    {
      reportId: "123456789",
      reportType: "INAPPROPRIATE_BEHAVIOR",
      reportee: "พศวีร์ ศรีอรุโณทัย",
      reporter: "ธนกฤต ยิ่งวัฒนกุล",
      description:
        "ลงรูปคู่ในไอจีแกล้งสาววาย จนโดนทัวร์ลงวุ่นวายไปหมด ลงรูปคู่ในไอจีแกล้งสาววาย จนโดนทัวร์ลงวุ่นวายไปหมด ลงรูปคู่ในไอจีแกล้งสาววาย จนโดนทัวร์ลงวุ่นวายไปหมด ลงรูปคู่ในไอจีแกล้งสาววาย จนโดนทัวร์ลงวุ่นวายไปหมด ลงรูปคู่ในไอจีแกล้งสาววายจนโดนทัวร์ลงวุ่นวายไปหมด"
    },
    {
      reportId: "123456780",
      reportType: "INAPPROPRIATE_BEHAVIOR",
      reportee: "พศวีร์ ศรีอรุโณทัย",
      reporter: "ธนกฤต ยิ่งวัฒนกุล",
      description:
        "ลงรูปคู่ในไอจีแกล้งสาววาย จนโดนทัวร์ลงวุ่นวายไปหมด ลงรูปคู่ในไอจีแกล้งสาววาย จนโดนทัวร์ลงวุ่นวายไปหมด ลงรูปคู่ในไอจีแกล้งสาววาย จนโดนทัวร์ลงวุ่นวายไปหมด ลงรูปคู่ในไอจีแกล้งสาววาย จนโดนทัวร์ลงวุ่นวายไปหมด ลงรูปคู่ในไอจีแกล้งสาววายจนโดนทัวร์ลงวุ่นวายไปหมด"
    },
    {
      reportId: "123456780",
      reportType: "INAPPROPRIATE_BEHAVIOR",
      reportee: "พศวีร์ ศรีอรุโณทัย",
      reporter: "ธนกฤต ยิ่งวัฒนกุล",
      description:
        "ลงรูปคู่ในไอจีแกล้งสาววาย จนโดนทัวร์ลงวุ่นวายไปหมด ลงรูปคู่ในไอจีแกล้งสาววาย จนโดนทัวร์ลงวุ่นวายไปหมด ลงรูปคู่ในไอจีแกล้งสาววาย จนโดนทัวร์ลงวุ่นวายไปหมด ลงรูปคู่ในไอจีแกล้งสาววาย จนโดนทัวร์ลงวุ่นวายไปหมด ลงรูปคู่ในไอจีแกล้งสาววายจนโดนทัวร์ลงวุ่นวายไปหมด"
    },
    {
      reportId: "123456780",
      reportType: "INAPPROPRIATE_BEHAVIOR",
      reportee: "พศวีร์ ศรีอรุโณทัย",
      reporter: "ธนกฤต ยิ่งวัฒนกุล",
      description:
        "ลงรูปคู่ในไอจีแกล้งสาววาย จนโดนทัวร์ลงวุ่นวายไปหมด ลงรูปคู่ในไอจีแกล้งสาววาย จนโดนทัวร์ลงวุ่นวายไปหมด ลงรูปคู่ในไอจีแกล้งสาววาย จนโดนทัวร์ลงวุ่นวายไปหมด ลงรูปคู่ในไอจีแกล้งสาววาย จนโดนทัวร์ลงวุ่นวายไปหมด ลงรูปคู่ในไอจีแกล้งสาววายจนโดนทัวร์ลงวุ่นวายไปหมด"
    }
  ]

  const moneyReportList = [
    {
      reportId: "123456789",
      reportType: "MONEY_SUSPENSION",
      reportee: "พศวีร์ ศรีอรุโณทัย",
      reporter: "ธนกฤต ยิ่งวัฒนกุล",
      description:
        "ลงรูปคู่ในไอจีแกล้งสาววาย จนโดนทัวร์ลงวุ่นวายไปหมด ลงรูปคู่ในไอจีแกล้งสาววาย จนโดนทัวร์ลงวุ่นวายไปหมด ลงรูปคู่ในไอจีแกล้งสาววาย จนโดนทัวร์ลงวุ่นวายไปหมด ลงรูปคู่ในไอจีแกล้งสาววาย จนโดนทัวร์ลงวุ่นวายไปหมด ลงรูปคู่ในไอจีแกล้งสาววายจนโดนทัวร์ลงวุ่นวายไปหมด"
    },
    {
      reportId: "123456780",
      reportType: "MONEY_SUSPENSION",
      reportee: "พศวีร์ ศรีอรุโณทัย",
      reporter: "ธนกฤต ยิ่งวัฒนกุล",
      description:
        "ลงรูปคู่ในไอจีแกล้งสาววาย จนโดนทัวร์ลงวุ่นวายไปหมด ลงรูปคู่ในไอจีแกล้งสาววาย จนโดนทัวร์ลงวุ่นวายไปหมด ลงรูปคู่ในไอจีแกล้งสาววาย จนโดนทัวร์ลงวุ่นวายไปหมด ลงรูปคู่ในไอจีแกล้งสาววาย จนโดนทัวร์ลงวุ่นวายไปหมด ลงรูปคู่ในไอจีแกล้งสาววายจนโดนทัวร์ลงวุ่นวายไปหมด"
    },
    {
      reportId: "123456780",
      reportType: "MONEY_SUSPENSION",
      reportee: "พศวีร์ ศรีอรุโณทัย",
      reporter: "ธนกฤต ยิ่งวัฒนกุล",
      description:
        "ลงรูปคู่ในไอจีแกล้งสาววาย จนโดนทัวร์ลงวุ่นวายไปหมด ลงรูปคู่ในไอจีแกล้งสาววาย จนโดนทัวร์ลงวุ่นวายไปหมด ลงรูปคู่ในไอจีแกล้งสาววาย จนโดนทัวร์ลงวุ่นวายไปหมด ลงรูปคู่ในไอจีแกล้งสาววาย จนโดนทัวร์ลงวุ่นวายไปหมด ลงรูปคู่ในไอจีแกล้งสาววายจนโดนทัวร์ลงวุ่นวายไปหมด"
    },
    {
      reportId: "123456780",
      reportType: "MONEY_SUSPENSION",
      reportee: "พศวีร์ ศรีอรุโณทัย",
      reporter: "ธนกฤต ยิ่งวัฒนกุล",
      description:
        "ลงรูปคู่ในไอจีแกล้งสาววาย จนโดนทัวร์ลงวุ่นวายไปหมด ลงรูปคู่ในไอจีแกล้งสาววาย จนโดนทัวร์ลงวุ่นวายไปหมด ลงรูปคู่ในไอจีแกล้งสาววาย จนโดนทัวร์ลงวุ่นวายไปหมด ลงรูปคู่ในไอจีแกล้งสาววาย จนโดนทัวร์ลงวุ่นวายไปหมด ลงรูปคู่ในไอจีแกล้งสาววายจนโดนทัวร์ลงวุ่นวายไปหมด"
    }
  ]

  const systemReportList = [
    {
      reportId: "123456789",
      reportType: "SYSTEM_ERROR",
      reportee: "พศวีร์ ศรีอรุโณทัย",
      reporter: "ธนกฤต ยิ่งวัฒนกุล",
      description:
        "ลงรูปคู่ในไอจีแกล้งสาววาย จนโดนทัวร์ลงวุ่นวายไปหมด ลงรูปคู่ในไอจีแกล้งสาววาย จนโดนทัวร์ลงวุ่นวายไปหมด ลงรูปคู่ในไอจีแกล้งสาววาย จนโดนทัวร์ลงวุ่นวายไปหมด ลงรูปคู่ในไอจีแกล้งสาววาย จนโดนทัวร์ลงวุ่นวายไปหมด ลงรูปคู่ในไอจีแกล้งสาววายจนโดนทัวร์ลงวุ่นวายไปหมด"
    },
    {
      reportId: "123456780",
      reportType: "SYSTEM_ERROR",
      reportee: "พศวีร์ ศรีอรุโณทัย",
      reporter: "ธนกฤต ยิ่งวัฒนกุล",
      description:
        "ลงรูปคู่ในไอจีแกล้งสาววาย จนโดนทัวร์ลงวุ่นวายไปหมด ลงรูปคู่ในไอจีแกล้งสาววาย จนโดนทัวร์ลงวุ่นวายไปหมด ลงรูปคู่ในไอจีแกล้งสาววาย จนโดนทัวร์ลงวุ่นวายไปหมด ลงรูปคู่ในไอจีแกล้งสาววาย จนโดนทัวร์ลงวุ่นวายไปหมด ลงรูปคู่ในไอจีแกล้งสาววายจนโดนทัวร์ลงวุ่นวายไปหมด"
    },
    {
      reportId: "123456780",
      reportType: "SYSTEM_ERROR",
      reportee: "พศวีร์ ศรีอรุโณทัย",
      reporter: "ธนกฤต ยิ่งวัฒนกุล",
      description:
        "ลงรูปคู่ในไอจีแกล้งสาววาย จนโดนทัวร์ลงวุ่นวายไปหมด ลงรูปคู่ในไอจีแกล้งสาววาย จนโดนทัวร์ลงวุ่นวายไปหมด ลงรูปคู่ในไอจีแกล้งสาววาย จนโดนทัวร์ลงวุ่นวายไปหมด ลงรูปคู่ในไอจีแกล้งสาววาย จนโดนทัวร์ลงวุ่นวายไปหมด ลงรูปคู่ในไอจีแกล้งสาววายจนโดนทัวร์ลงวุ่นวายไปหมด"
    },
    {
      reportId: "123456780",
      reportType: "SYSTEM_ERROR",
      reportee: "พศวีร์ ศรีอรุโณทัย",
      reporter: "ธนกฤต ยิ่งวัฒนกุล",
      description:
        "ลงรูปคู่ในไอจีแกล้งสาววาย จนโดนทัวร์ลงวุ่นวายไปหมด ลงรูปคู่ในไอจีแกล้งสาววาย จนโดนทัวร์ลงวุ่นวายไปหมด ลงรูปคู่ในไอจีแกล้งสาววาย จนโดนทัวร์ลงวุ่นวายไปหมด ลงรูปคู่ในไอจีแกล้งสาววาย จนโดนทัวร์ลงวุ่นวายไปหมด ลงรูปคู่ในไอจีแกล้งสาววายจนโดนทัวร์ลงวุ่นวายไปหมด"
    },
    {
      reportId: "123456780",
      reportType: "SYSTEM_ERROR",
      reportee: "พศวีร์ ศรีอรุโณทัย",
      reporter: "ธนกฤต ยิ่งวัฒนกุล",
      description:
        "ลงรูปคู่ในไอจีแกล้งสาววาย จนโดนทัวร์ลงวุ่นวายไปหมด ลงรูปคู่ในไอจีแกล้งสาววาย จนโดนทัวร์ลงวุ่นวายไปหมด ลงรูปคู่ในไอจีแกล้งสาววาย จนโดนทัวร์ลงวุ่นวายไปหมด ลงรูปคู่ในไอจีแกล้งสาววาย จนโดนทัวร์ลงวุ่นวายไปหมด ลงรูปคู่ในไอจีแกล้งสาววายจนโดนทัวร์ลงวุ่นวายไปหมด"
    }
  ]
  //
  const [menuList, setMenuList] = useState(defualtMenuList)
  const [focusReports, setFocusReports] = useState(behaviorReportList)
  const menuHandler = (focusIndex: number) => {
    if (focusIndex === 1) {
      return
    }
    let newMenuHandler = ["", "", ""]
    menuList.map((menu: string, index: number) => {
      if (focusIndex === 0) {
        newMenuHandler[(index + 1) % menuList.length] = menu
      } else {
        newMenuHandler[(index + 2) % menuList.length] = menu
      }
    })
    if (menuList[focusIndex] === "รายงานหมอดูไม่มาตามนัดหมาย") {
      setFocusReports(moneyReportList)
    } else if (menuList[focusIndex] === "รายงานพฤติกรรมที่ไม่เหมาะสม") {
      setFocusReports(behaviorReportList)
    } else {
      setFocusReports(systemReportList)
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
              <div
                className={`flex flex-row max-w-[1500px] justify-between flex-wrap content-around px-16 py-4 m-4 ${
                  focusReports.length === 2 ? "space-x-8" : ""
                }`}
              >
                {focusReports.map((report: ReportInfoType) => (
                  <ReportCard report={report} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
