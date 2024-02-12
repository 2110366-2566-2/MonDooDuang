import { useEffect, useState } from "react"
import { FortuneTellerRequest } from "./components/FortuneTellerRequest"
import { FullPicView } from "./components/FullPicView"
import { ConfirmModal } from "./components/ConfirmModal"
import { RequestService } from "./services/RequestService"
import { environment } from "../../common/constants/environment"
import { NextPageIcon } from "./components/Icon"

export default function AdminApprovalPage() {
  const [isFullPicOpen, setIsFullPicOpen] = useState(false)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [confirmType, setConfirmType] = useState<ConfirmType>("APPROVE")
  const [fortuneTellerRequests, setFortuneTellerRequests] = useState<FortuneTellerRequest[]>([])
  const [focusRequest, setFocusRequest] = useState<FortuneTellerRequest>()
  const [isUpdate, setIsupdate] = useState(false)

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
            window.location.href = environment.frontend.url + "/search"
          }}
        >
          หน้าหลัก
        </div>
        <NextPageIcon />
        <div className="text-nav-yellow">คำร้องขออนุญาตเป็นหมอดู</div>
      </div>
    )
  }
  return (
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
            {fortuneTellerRequests.map((req: FortuneTellerRequest) => {
              return (
                <FortuneTellerRequest
                  key={req.requestId}
                  fortuneTellerRequest={req}
                  focusHandler={(value: FortuneTellerRequest) => {
                    setFocusRequest(value)
                    setIsFullPicOpen(true)
                  }}
                  onApprove={(value: FortuneTellerRequest) => {
                    setFocusRequest(value)
                    setConfirmType("APPROVE")
                    setIsConfirmModalOpen(true)
                  }}
                  onReject={(value: FortuneTellerRequest) => {
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
          fortuneTeller={focusRequest ? focusRequest.stagename : ""}
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
              } else {
                RequestService.updateRequestStatus(focusRequest.requestId, "REJECTED")
              }
            }

            setIsupdate(!isUpdate)
          }}
        />
      </div>
    </div>
  )
}
