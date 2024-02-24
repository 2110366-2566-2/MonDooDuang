import FortuneTellerPicture from "./FortuneTellerPicture"
import ChatIcon from "./ChatIcon"
import FortuneTellerPictureBlur from "./FortuneTellerPictureBlur"
import RatedStar from "./RatedStar"
import LeftLine from "../Line/LeftLine"
import RightLine from "../Line/RightLine"

import { environment } from "../../../../common/constants/environment"

import { FortuneTellerService } from "../../services/FortuneTellerService"
import { useEffect, useState } from "react"
import { ConversationService } from "../../services/ConversationService"

export default function FortuneTellerDetails({
  fid,userId
}: {
  fid: string | undefined
  userId: string
}) {

  let fortuneTellerId = ""
  if (fid) {
    fortuneTellerId = fid
  } else {
    window.location.href = environment.frontend.url + "/search"
  }

  const [fortuneTellerStageName, setFortuneTellerStageName] = useState<string>()
  const [fortuneTellerDescription, setFortuneTellerDescription] = useState<string>()
  const [fortuneTellerAverageStar, setFortuneTellerAverageStar] = useState<number>()
  const [fortuneTellerProfile, setFortuneTellerProfile] = useState<string>()

  useEffect(() => {
    const fetchFortuneTellerDetail = async () => {
      const response = await FortuneTellerService.getFortuneTellerDisplayInfoById(fortuneTellerId)
      const fortuneTellerStageName = response.stageName
      const fortuneTellerDescription = response.description
      const fortuneTellerAverageStar = response.averageStar
      const fortuneTellerProfile = response.profilePicture

      setFortuneTellerStageName(fortuneTellerStageName)
      setFortuneTellerDescription(fortuneTellerDescription)
      setFortuneTellerAverageStar(fortuneTellerAverageStar)
      setFortuneTellerProfile(fortuneTellerProfile)
    }
    fetchFortuneTellerDetail()
  }, [])

  async function chat() {
    const {conversationId} = await ConversationService.createConversation(userId, fortuneTellerId)
    window.location.href = `${environment.frontend.url}/conversation/${conversationId}`
  }

  return (
    <div className="w-[40%] relative flex flex-wrap justify-center self-start min-w-[550px]">
      <div className="py-10">
        <div className="relative z-40 ml-[370px]" onClick={chat}>
          <ChatIcon></ChatIcon>
        </div>
        <div className="relative z-0 w-[100%] mt-[-150px] flex justify-center">
          <FortuneTellerPictureBlur profile={fortuneTellerProfile == undefined? "" : fortuneTellerProfile}></FortuneTellerPictureBlur>
          <FortuneTellerPicture profile={fortuneTellerProfile == undefined? "" : fortuneTellerProfile}></FortuneTellerPicture>
        </div>
      </div>
      <div className="relative text-center">
        <div className="absolute font-libre-bodoni text-center w-[100%] text-[40px]">{fortuneTellerStageName}</div>
        <div className="font-libre-bodoni text-[40px] w-[100%] blur-sm">{fortuneTellerStageName}</div>
        <div className="flex flex-row justify-center space-x-3 items-end">
          <RatedStar check = {fortuneTellerAverageStar == undefined? false :fortuneTellerAverageStar>0.5}></RatedStar>
          <RatedStar check = {fortuneTellerAverageStar == undefined? false :fortuneTellerAverageStar>1.5}></RatedStar>
          <RatedStar check = {fortuneTellerAverageStar == undefined? false :fortuneTellerAverageStar>2.5}></RatedStar>
          <RatedStar check = {fortuneTellerAverageStar == undefined? false :fortuneTellerAverageStar>3.5}></RatedStar>
          <RatedStar check = {fortuneTellerAverageStar == undefined? false :fortuneTellerAverageStar>4.5}></RatedStar>
          <div className="font-libre-bodoni text-[20px] mb-[-4px]">{fortuneTellerAverageStar} / 5</div>
        </div>
        <div className="py-4">
          <div className="flex flex-row space-x-4 items-center">
            <LeftLine></LeftLine>
            <div className="font-medium text-wrap">รายละเอียด</div>
            <RightLine></RightLine>
          </div>
          <div className="break-words max-w-[600px]">{fortuneTellerDescription}</div>
        </div>
      </div>
    </div>
  )
}