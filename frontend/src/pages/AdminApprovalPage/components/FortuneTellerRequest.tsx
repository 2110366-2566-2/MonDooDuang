import { formatCitizenId, formatPhoneNumber } from "../../../common/utils/FormatUtils"
import { FortuneTellerRequestType } from "../types/AdminApprovalTypes"
import { CorrectIcon, DefaultProfilePic, WrongIcon } from "./Icon"

export function FortuneTellerRequest({
  fortuneTellerRequest,
  focusHandler,
  onApprove,
  onReject
}: {
  fortuneTellerRequest: FortuneTellerRequestType
  focusHandler: (value: FortuneTellerRequestType) => void
  onApprove: (value: FortuneTellerRequestType) => void
  onReject: (value: FortuneTellerRequestType) => void
}) {
  return (
    <div
      style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
      className="flex flex-row justify-items-center items-center rounded-md space-x-12 py-2 px-10 bg-gray-boxbg bg-opacity-75"
    >
      <div className="rounded-full w-[100px] h-[100px]">
        {fortuneTellerRequest.profilePic ? (
          <img
            src={fortuneTellerRequest.profilePic}
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
      <div className="flex flex-col justify-items-center items-start text-white text-md font-noto-sans">
        <div>Username : {fortuneTellerRequest.fullName}</div>
        <div>ชื่อหมอดู : {fortuneTellerRequest.stagename}</div>
        <div>เบอร์โทรศัพท์ : {formatPhoneNumber(fortuneTellerRequest.phoneNumber)}</div>
        <div>
          เลขบัตรประจำตัวประชาชน : <br /> {formatCitizenId(fortuneTellerRequest.identityCardNumber)}
        </div>
      </div>
      <div className="flex flex-col justify-items-center items-start space-y-3">
        <div className="w-[240px] h-[150px] bg-yellow-400">
          <img
            src={fortuneTellerRequest.approvalPic}
            alt="Profile"
            style={{
              objectFit: "cover",
              width: "240px",
              height: "150px"
            }}
          />
        </div>
        <button
          className="p-2 text-zinc-600 bg-zinc-300 bg-opacity-90 font-noto-sans rounded-md hover:bg-opacity-100 "
          onClick={() => {
            if (fortuneTellerRequest.approvalPic) {
              focusHandler(fortuneTellerRequest)
            }
          }}
        >
          ดูรูปขนาดเต็ม
        </button>
      </div>
      <div className="flex flex-col items-start justify-items-center space-y-6 font-noto-sans">
        <button
          onClick={() => {
            onApprove(fortuneTellerRequest)
          }}
          style={{ transition: "background-color 0.3s" }}
          className="flex flex-row space-x-3 py-2 px-6 justify-items-center items-center rounded-[10px] p-2 text-gray-200 text-lg font-normal bg-mango-yellow hover:bg-mango-yellow-hover"
        >
          <CorrectIcon />
          <div>อนุญาต</div>
        </button>

        <button
          onClick={() => {
            onReject(fortuneTellerRequest)
          }}
          style={{ transition: "background-color 0.3s" }}
          className="flex flex-row space-x-3 p-2 justify-items-center items-center rounded-[10px] p-2 text-gray-200 text-lg font-normal bg-cancel-red hover:bg-red-600"
        >
          <WrongIcon />
          <div>ยกเลิกคำขอ</div>
        </button>
      </div>
    </div>
  )
}
