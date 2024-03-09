import { useState } from "react"
import { Rating } from "@mui/material"
import { styled } from "@mui/material/styles"
import { SelectedStar, UnselectedStar } from "./StarIcon"
import { ReviewService } from "../../services/ReviewService"

export default function ReviewModal(props: {
  isShowComplete: boolean
  setIsShowComplete: React.Dispatch<React.SetStateAction<boolean>>
  isCustomer: boolean
  customerId: string
  fortuneTellerId: string
  appointmentId: string
}) {
  const closeCompleteModal = () => {
    props.setIsShowComplete(false)
  }

  const CustomRating = styled(Rating)({
    "& .MuiRating-icon": {
      margin: "0.25rem"
    }
  })

  const [score, setScore] = useState(0)
  const [isScoreError, setIsScoreError] = useState(false)
  const [reviewMessage, setReviewMessage] = useState("")

  const validation = () => {
    if (score === 0) {
      setIsScoreError(true)
      return false
    }
    return true
  }
  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (validation()) {
      closeCompleteModal()
      const response = await ReviewService.createReview(
        reviewMessage,
        score,
        props.customerId,
        props.fortuneTellerId,
        props.appointmentId
      )

      if (!response.isSuccess) {
        return alert(response.message)
      }
      window.location.href = "/conversation"
    }
  }

  return (
    <div
      className={` w-screen h-screen bg-black bg-opacity-55 font-sans fixed top-0 left-0 z-[2]
     ${props.isShowComplete ? "flex" : "hidden"} justify-center items-center`}
    >
      <div className="flex flex-col w-[28vw] min-h-80 bg-[#E8E8E8] rounded-3xl items-center m-auto p-8">
        <h1 className="text-[#0C0000] text-3xl font-semibold leading-normal">รีวิวหมอดู</h1>
        <label className="text-[#757575] text-base leading-normal mb-4">
          กรุณาให้คะแนนการบริการของหมอดู
        </label>

        <div className="flex flex-row content-center justify-self-center">
          <CustomRating
            value={score}
            onChange={(event, newValue) => {
              if (newValue !== null) setScore(newValue)
            }}
            icon={SelectedStar}
            emptyIcon={UnselectedStar}
          />
          <label className="pl-2 my-auto text-base leading-normal">{score} / 5</label>
        </div>
        <div className="flex justify-items-center">
          {isScoreError && <span className="text-red-500 text-xs mx-auto">กรุณาระบุคะแนน</span>}
        </div>
        <form id="completeSubmit" onSubmit={submitForm} className="w-full h-20 my-4">
          <textarea
            className=" p-2 h-full w-full rounded-xl"
            onChange={(e) => setReviewMessage(e.target.value)}
          />
        </form>
        <div className="flex flex-row w-full justify-end">
          <button
            className="bg-[#757575] text-white text-base w-32 h-8 rounded-xl leading-normal cursor-pointer"
            onClick={() => {
              closeCompleteModal()
              window.location.href = "/conversation"
            }}
          >
            ยกเลิก
          </button>
          <button
            className="bg-[#DD9F00] text-white text-base w-32 h-8 ml-6 rounded-xl place-self-end leading-normal cursor-pointer"
            form="completeSubmit"
          >
            รีวิวหมอดู
          </button>
        </div>
      </div>
    </div>
  )
}
