import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../common/providers/AuthProvider"
import NavBarAdmin from "../../common/components/NavBar/NavBarAdmin"
import { PageLine } from "./components/Icon"
import ReportCard from "./components/ReportCard"
import { ReportInfoType } from "./types/ReportInfoType"
import { ReportManagementService } from "./services/ReportManagementService"
import {
  ConfirmOverlay,
  ConfirmOverlayProps
} from "../../common/components/ConfirmOverlay/ConfirmOverlay"
import {
  SuccessModal,
  SuccessModalProps
} from "../../common/components/SuccessOverlay/SuccessOverlay"
import { ErrorModal, ErrorModalProps } from "../../common/components/ErrorOverlay/ErrorOverlay"

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
  const [isUpdate, setIsUpdate] = useState(false)

  //overlay
  const defaultConfirmProps: ConfirmOverlayProps = {
    onClose: () => {
      setIsConfirmModalOpen(false)
    },
    onConfirm: () => {
      setIsConfirmModalOpen(false)
    },
    target: "",
    type: "REJECT",
    title: "",
    message: "",
    info: ``
  }
  const defaultSuccessProps: SuccessModalProps = {
    onClose: () => {
      setIsSuccessModalOpen(false)
    },
    title: "",
    info: ``
  }

  const defaultErrorProps: ErrorModalProps = {
    onClose: () => {
      setIsSuccessModalOpen(false)
    },
    title: "",
    info: ``
  }

  const setUnsuspendedConfirmProps = (report: ReportInfoType) => {
    const unsuspenedConfirmProps: ConfirmOverlayProps = {
      onClose: () => {
        setIsConfirmModalOpen(false)
      },
      onConfirm: async () => {
        setIsConfirmModalOpen(false)
        const isSuccess = await ReportManagementService.updateReportAndAppointment(
          report.reportId,
          "COMPLETED",
          report.appointmentId,
          "NO_FRAUD_DETECTED"
        )
        if (isSuccess) {
          setUnsuspendedSuccessProps()
          setIsSuccessModalOpen(true)
        } else {
          setUnsuspendedErrorProps()
          setIsErrorsModalOpen(true)
        }
      },
      target: report.reporteeName,
      type: "REJECT",
      title: "ต้องการจ่ายเงินให้หมอดูตามปกติ",
      message: "ใช่หรือไม่",
      info: `ตอนนี้ระบบได้ระงับการโอนเงินไปยังหมอดูเอาไว้\nหากกดยืนยัน ระบบจะดำเนินการโอนเงินให้หมอดูตามปกติ`,
    }
    setConfirmProps(unsuspenedConfirmProps)
  }

  const setUnsuspendedSuccessProps = () => {
    const unsuspendedSuccessProps: SuccessModalProps = {
      onClose: () => {
        setIsUpdate(!isUpdate)
        setIsSuccessModalOpen(false)
      },
      title: "ระบบโอนเงินไปยังหมอดูสำเร็จ",
      info: "หมอดูได้รับเงินค่าดูดวงตามปกติ"
    }
    setSuccessProps(unsuspendedSuccessProps)
  }

  const setUnsuspendedErrorProps = () => {
    const unsuspendedErrorProps: ErrorModalProps = {
      onClose: () => {
        setIsUpdate(!isUpdate)
        setIsErrorsModalOpen(false)
      },
      title: "ไม่สามารถโอนเงินให้หมอดูได้",
      info: `เกิดข้อผิดพลาดในระหว่างการโอนเงิน\nโปรดลองใหม่อีกครั้ง`
    }
    setErrorProps(unsuspendedErrorProps)
  }

  const setRefundConfirmProps = (report: ReportInfoType) => {
    const refundConfirmProps: ConfirmOverlayProps = {
      onClose: () => {
        setIsConfirmModalOpen(false)
      },
      onConfirm: async () => {
        setIsConfirmModalOpen(false)
        const isSuccess = await ReportManagementService.updateReportAndAppointment(
          report.reportId,
          "COMPLETED",
          report.appointmentId,
          "REFUNDED"
        )
        if (isSuccess) {
          setRefundSuccsessProps(report)
          setIsSuccessModalOpen(true)
        } else {
          setRefundErrorProps()
          setIsErrorsModalOpen(true)
        }
      },
      target: report.reporterName,
      type: "REJECT",
      title: "ต้องการคืนเงินให้ลูกค้า",
      message: "ใช่หรือไม่",
      info: `หากกดยืนยันการคืนเงิน เงินจะถูกโอนกลับไปยังลูกค้า`
    }
    setConfirmProps(refundConfirmProps)
  }

  const setRefundSuccsessProps = (report: ReportInfoType) => {
    const refundSuccessProps: SuccessModalProps = {
      onClose: () => {
        setIsSuccessModalOpen(false)
        setbanConfirmProps(report)
        setIsConfirmModalOpen(true)
      },
      title: "ระบบคืนเงินไปยังผู้ใช้สำเร็จ",
      info: "ผู้ใช้ได้รับเงินคืนเรียบร้อย"
    }
    setSuccessProps(refundSuccessProps)
  }

  const setRefundErrorProps = () => {
    const refundErrorProps: ErrorModalProps = {
      onClose: () => {
        setIsUpdate(!isUpdate)
        setIsErrorsModalOpen(false)
      },
      title: "ไม่สามารถคืนเงินไปยังผู้ใช้ได้",
      info: `เกิดข้อผิดพลาดในระหว่างการโอนเงิน\nโปรดลองใหม่อีกครั้ง`
    }
    setErrorProps(refundErrorProps)
  }

  const setbanConfirmProps = (report: ReportInfoType) => {
    const banConfirmProps: ConfirmOverlayProps = {
      onClose: () => {
        setIsUpdate(!isUpdate)
        setIsConfirmModalOpen(false)
      },
      onConfirm: () => {
        setIsConfirmModalOpen(false)
        ReportManagementService.updateReportAndBan(report.reportId, "COMPLETED", report.reporteeId)
        setSuccessProps(banSuccessProps)
        setIsSuccessModalOpen(true)
      },
      target: report.reporteeName,
      type: "REJECT",
      title: "ต้องการแบนผู้ใช้",
      message: "ใช่หรือไม่",
      warning: `หากกดแบนไปแล้วผู้ใช้จะไม่สามารถใช้งาน MonDooDuang ได้อีก`
    }
    setConfirmProps(banConfirmProps)
  }

  const banSuccessProps: SuccessModalProps = {
    onClose: () => {
      setIsUpdate(!isUpdate)
      setIsSuccessModalOpen(false)
    },
    title: "แบนผู้ใช้งานสำเร็จ",
    info: `ผู้ใช้งานนี้จะไม่สามารถใช้งาน\nMonDooDuang ได้อีกต่อไป`
  }

  const setFinishedConfirmProps = (report: ReportInfoType) => {
    const finishConfirmProps: ConfirmOverlayProps = {
      onClose: () => {
        setIsConfirmModalOpen(false)
      },
      onConfirm: () => {
        ReportManagementService.updateReportStatus(report.reportId, "COMPLETED")
        setIsUpdate(!isUpdate)
        setIsConfirmModalOpen(false)
      },
      target: "ReportID : " + report.reportId,
      type: "APPROVE",
      title: "จัดการคำร้อง",
      message: "เรียบร้อยแล้วใช่หรือไม่",
      info: `หากกดยืนยันแล้วจะไม่สามารถจัดการหรือตรวจสอบคำร้องนี้ได้อีก`
    }
    setConfirmProps(finishConfirmProps)
  }

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [isErrorModalOpen, setIsErrorsModalOpen] = useState(false)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [confirmProps, setConfirmProps] = useState<ConfirmOverlayProps>(defaultConfirmProps)
  const [successProps, setSuccessProps] = useState<SuccessModalProps>(defaultSuccessProps)
  const [errorProps, setErrorProps] = useState<ErrorModalProps>(defaultErrorProps)
  //

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

          if (menuList[1] === "รายงานหมอดูไม่มาตามนัดหมาย") {
            setFocusReports(moneyReportData)
          } else if (menuList[1] === "รายงานพฤติกรรมที่ไม่เหมาะสม") {
            setFocusReports(behaviorReportData)
          } else {
            setFocusReports(systemReportData)
          }
        }
      } catch (err) {
        console.log(err)
      }
    }
    fetchReports()
  }, [isUpdate])

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
        <ConfirmOverlay isVisible={isConfirmModalOpen} confirmProps={confirmProps} />
        <ErrorModal isVisible={isErrorModalOpen} errorProps={errorProps} />
        <SuccessModal isVisible={isSuccessModalOpen} successProps={successProps} />
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
                  className={`flex flex-row max-w-[1648px] justify-between flex-wrap content-around px-16 py-4 m-4 ${
                    focusReports.length === 2 ? "admin-report:space-x-8" : ""
                  }`}
                >
                  {focusReports.map((report: ReportInfoType) => (
                    <ReportCard
                      report={report}
                      onClickFirstAction={() => {
                        if (menuList[1] === "รายงานหมอดูไม่มาตามนัดหมาย") {
                          setRefundConfirmProps(report)
                        } else {
                          setFinishedConfirmProps(report)
                        }
                        setIsConfirmModalOpen(true)
                      }}
                      onClickSecondAction={() => {
                        if (menuList[1] === "รายงานหมอดูไม่มาตามนัดหมาย") {
                          setUnsuspendedConfirmProps(report)
                        } else {
                          setbanConfirmProps(report)
                        }
                        setIsConfirmModalOpen(true)
                      }}
                    />
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
