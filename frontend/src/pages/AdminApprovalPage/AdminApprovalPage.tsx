import { useContext, useEffect, useState } from "react"
import { FullPicView } from "./components/FullPicView"
import { ConfirmModal } from "./components/ConfirmModal"
import { RequestService } from "./services/RequestService"
import { environment } from "../../common/constants/environment"
import { NextPageIcon } from "./components/Icon"
import { ConfirmType, FortuneTellerRequestType } from "./types/AdminApprovalTypes"
import { FortuneTellerRequest } from "./components/FortuneTellerRequest"
import { AuthContext } from "../../common/providers/AuthProvider"
import NavBarAdmin from "../../common/components/NavBar/NavBarAdmin"

export default function AdminApprovalPage() {
  const { username } = useContext(AuthContext)

  const [isFullPicOpen, setIsFullPicOpen] = useState(false)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [confirmType, setConfirmType] = useState<ConfirmType>("APPROVE")
  const [fortuneTellerRequests, setFortuneTellerRequests] = useState<FortuneTellerRequestType[]>([])
  const [focusRequest, setFocusRequest] = useState<FortuneTellerRequestType>()
  const [isUpdate, setIsUpdate] = useState(false)

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const requests = await RequestService.getPendingRequest()

        if (requests) {
          setFortuneTellerRequests(requests)
        }
      } catch (err) {
        console.log(err)
      }
    }
    fetchRequests()
  }, [isUpdate])

  const PageNavigation = () => {
    return (
      <div className="flex flex-row justify-items-start items-center space-x-3 font-noto-sans text-xl">
        <div
          className="text-white"
          onClick={() => {
            window.location.href = environment.frontend.url + "/admin/report_management"
          }}
        >
          หน้าหลัก
        </div>
        <NextPageIcon />
        <div className="text-mdd-focus-yellow">คำร้องขออนุญาตเป็นหมอดู</div>
      </div>
    )
  }
  return (
    <>
      <NavBarAdmin menuFocus={"adminApproval"} username={username} />
      <div className="px-20 py-8">
        <PageNavigation />
        <div className="w-auto h-auto">
          <div className="flex flex-col justify-items-center items-center space-y-12">
            <div className="mt-10 text-white text-4xl font-noto-sans">คำร้องขออนุญาตเป็นหมอดู</div>

            <div className="h-[720px] w-[1000px] py-4 px-12 border-solid border-2 border-white rounded-md space-y-4 overflow-y-auto justify-items-center items-center">
              {fortuneTellerRequests.length === 0 ? (
                <div className="mt-72 text-white font-noto-sans text-xl text-center self-center justify-self-center">
                  ' ไม่มีคำขออนุญาตเพิ่มเติมในขณะนี้ '
                </div>
              ) : null}
              {fortuneTellerRequests.map((req: FortuneTellerRequestType) => {
                return (
                  <FortuneTellerRequest
                    key={req.requestId}
                    fortuneTellerRequest={req}
                    focusHandler={(value: FortuneTellerRequestType) => {
                      setFocusRequest(value)
                      setIsFullPicOpen(true)
                    }}
                    onApprove={(value: FortuneTellerRequestType) => {
                      setFocusRequest(value)
                      setConfirmType("APPROVE")
                      setIsConfirmModalOpen(true)
                    }}
                    onReject={(value: FortuneTellerRequestType) => {
                      setFocusRequest(value)
                      setConfirmType("REJECT")
                      setIsConfirmModalOpen(true)
                    }}
                  />
                )
              })}
            </div>
          </div>
          <FullPicView
            approvalPic={focusRequest ? focusRequest.approvalPic : ""}
            isVisible={isFullPicOpen}
            onClose={() => {
              setIsFullPicOpen(false)
            }}
          />
          <ConfirmModal
            fullName={focusRequest ? focusRequest.fullName : ""}
            type={confirmType}
            isVisible={isConfirmModalOpen}
            onClose={() => {
              setIsConfirmModalOpen(false)
            }}
            onConfirm={() => {
              setIsConfirmModalOpen(false)
              if (focusRequest) {
                if (confirmType == "APPROVE") {
                  RequestService.updateRequestStatus(focusRequest?.requestId, "ACCEPTED")
                  RequestService.updateFortuneTellerTypeAndVerified(focusRequest?.requestId)
                } else {
                  RequestService.updateRequestStatus(focusRequest.requestId, "REJECTED")
                }
              }

              setIsUpdate(!isUpdate)
            }}
          />
        </div>
      </div>
    </>
  )
}
