import FortuneTellerPicture from "./FortuneTellerPicture"
import ChatIcon from "./ChatIcon"
import FortuneTellerPictureBlur from "./FortuneTellerPictureBlur"
import RatedStar from "./RatedStar"

import { FortuneTellerService } from "../../services/FortuneTellerService"
import { useEffect, useState } from "react"

export default function FortuneTellerDetails() {

  const [fortuneTellerStageName, setFortuneTellerStageName] = useState<string>()
  const [fortuneTellerDescription, setFortuneTellerDescription] = useState<string>()
  const [fortuneTellerAverageStar, setFortuneTellerAverageStar] = useState<number>()

  const mockUserId = "0b7cbf76-23f8-4a6a-8ac7-b7f13e3df07d"

  useEffect(() => {
    const fetchFortuneTellerDetail = async () => {
      const response = await FortuneTellerService.getFortuneTellerbyId(mockUserId)
      const fortuneTellerStageName = await response.stageName
      const fortuneTellerDescription = await response.description
      const fortuneTellerAverageStar = await response.averageStar

      setFortuneTellerStageName(fortuneTellerStageName)
      setFortuneTellerDescription(fortuneTellerDescription)
      setFortuneTellerAverageStar(fortuneTellerAverageStar)
    }
    fetchFortuneTellerDetail()
  }, [])

    return (
      <div className="w-[40%] relative flex flex-wrap justify-center self-start min-w-[550px]">
        <div className="py-10">
          <div className="relative z-40 ml-[370px]">
          <ChatIcon></ChatIcon>
          </div>
          <div className="relative z-0 w-[100%] mt-[-150px] flex justify-center">
          <FortuneTellerPictureBlur></FortuneTellerPictureBlur>
          <FortuneTellerPicture></FortuneTellerPicture>
          </div>
        </div>
        <div className="text-center">
            <div className="shadow-white font-libre-bodoni text-[40px]">{fortuneTellerStageName}</div>
            <div className="flex flex-row justify-center space-x-3 items-end">
              <RatedStar></RatedStar>
              <RatedStar></RatedStar>
              <RatedStar></RatedStar>
              <RatedStar></RatedStar>
              <RatedStar></RatedStar>
              <div className="font-libre-bodoni text-[20px] mb-[-4px]">{fortuneTellerAverageStar} / 5</div>
            </div>
            <div className="py-4">
              <div >รายละเอียด</div>
              <div>{fortuneTellerDescription}</div>
            </div>
        </div>
      </div>
    )
  }