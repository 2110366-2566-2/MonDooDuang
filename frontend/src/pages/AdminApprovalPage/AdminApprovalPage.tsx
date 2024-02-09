import { useState } from "react"
import { FortuneTellerRequest } from "./components/FortuneTellerRequest"
import { FullPicView } from "./components/FullPicView"
import { ConfirmModal } from "./components/ConfirmModal"

export default function AdminApprovalPage() {
  const [isFullPicOpen, setIsFullPicOpen] = useState(false)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [confirmType,setConfirmType] = useState<ConfirmType>('APPROVE')
  // const [fortuneTellerRequests,setFortuneTellerRequests] = useState<FortuneTellerRequest[]>([])
  const [focusRequest, setFocusRequest] = useState<FortuneTellerRequest>()
  //mock data
  const fortuneTellerRequests_mock = [
    {
      id: "01",
      username: "ม๋าแดงประจำบนด",
      stagename: "ม๋าแดงประจำบนด",
      phoneNumber: "081-123-4567",
      ssn: "0-1234-56789-10-1",
      profilePic: "../../../../public/mock_profile.jpg",
      approvalPic: "../../../../public/mock_approval_1.JPG"
    },
    {
      id: "02",
      username: "เต้าหู้ประจำบนด",
      stagename: "เต้าหู้ประจำบนด",
      phoneNumber: "081-123-4567",
      ssn: "0-1234-56789-10-1",
      profilePic: "../../../../public/mock_profile.jpg",
      approvalPic: "../../../../public/mock_approval_2.JPG"
    }
  ]
  // setFortuneTellerRequests(fortuneTellerRequests_mock)

  // console.log(focusRequest?.stagename)
  return (
    <div className="bg-black w-100 h-[100vh]">
      <div className="flex flex-col justify-items-center items-center space-y-12">
        <div className="mt-32 text-white text-4xl">คำร้องขออนุญาตเป็นหมอดู</div>

        <div className="h-[720px] py-4 px-12 border-solid border-2 border-white rounded-md space-y-4 overflow-y-auto">
          {fortuneTellerRequests_mock.map((req: FortuneTellerRequest) => {
            return (
              <FortuneTellerRequest
                fortuneTellerRequest={req}
                focusHandler={(value: FortuneTellerRequest) => {
                  setFocusRequest(value)
                  setIsFullPicOpen(true)
                }}
                onApprove={(value:FortuneTellerRequest) => {
                  setFocusRequest(value)
                  setConfirmType('APPROVE')
                  setIsConfirmModalOpen(true)
                }}
                onReject={(value:FortuneTellerRequest) => {
                  setFocusRequest(value)
                  setConfirmType('REJECT')
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
        onClose={() => {setIsConfirmModalOpen(false)}}
        onConfirm={() => {setIsConfirmModalOpen(false)}}
      />
    </div>
  )
}
