import PictureFrame from "../frames/picture-frame.svg"
import CardFrame from "../frames/card-frame.svg"
import LogoIcon from "../icons/logo-icon.svg"
import ChatIcon from "../icons/chat-icon.svg"
import StarCornerIcon from "../icons/starcorner-icon.svg"

import Bow from "../miscellaneous/bow.svg"
import StarCorner from "../Miscellaneous/StartCorner"

import AppointmentIcon from "../Buttons/AppointmentIcon"
import InformationIcon from "../Buttons/InformationIcon"
import RatingStar from "../Rating/RatingStar"

interface FortuneTellerProps {
  name: string
  rating: number
  minPrice: number
  maxPrice: number
  image: string
  tags: string[]
  chat: () => void
  moreInformation: () => void
  makeAppointment: () => void
}

export default function FortuneTellerSerachModal({
  name,
  rating,
  minPrice,
  maxPrice,
  image,
  tags,
  chat,
  moreInformation,
  makeAppointment
}: FortuneTellerProps) {
  return (
    <div className="w-[81%] bg-white/[0.52] rounded-[10px] flex flex-col relative my-4">
      <img src={CardFrame} alt="Card Frame" className="bg-contain w-full p-3 absolute" />
      <StarCorner />
      <div className="relative">
        <img
          src={PictureFrame}
          alt="Picture Frame"
          className="bg-contain absolute w-[17.5rem] h-[17.5rem] rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-[13px] ml-0.5"
        />
        {/* if have profile picture */}
        {/* <img
          src="https://i.pinimg.com/236x/67/99/96/67999633eca4a4458fb52d556d3f4ff2.jpg"
          alt="Fortune Teller"
          className="bg-contain w-40 h-40 rounded-full flex justify-items-center mx-auto"
        /> */}
        {/* if don't have profile picture */}
        <img
          src={LogoIcon}
          alt="Logo Icon"
          className="bg-contain w-32 p-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-1"
        />
        <div className="bg-contain w-40 h-40 bg-black/[0.7] rounded-full flex justify-items-center mx-auto" />
        <div className="bg-[length:5.7rem_5.7rem] ">
          <img
            src={ChatIcon}
            alt="Chat Icon"
            onClick={chat}
            className="bg-cover bg-center w-[4.3rem] absolute left-[50%] top-[140px] translate-x-1/2 -translate-y-1/2 mt-1 mx-auto hover:scale-110 transition-all duration-200 ease-in-out cursor-pointer"
          />
        </div>
      </div>
      <div className="flex justify-center flex-col">
        <div className="absolute w-1/4 transform translate-x-1/3 -translate-y-2/3">
          <RatingStar rating={rating} />
        </div>
        <div className="mx-auto pt-1 w-1/2 flex text-center justify-items-center justify-center translate-y-[1.1rem]">
          <h1 className="absolute text-lg font-sans font-light tracking-wide text-[#3D164B] overflow-hidden">
            {tags[0]}
          </h1>
        </div>
        <img
          src={Bow}
          alt="Bow"
          className="bg-contain w-9/12 h-7/12 mt-4 flex justify-items-center mx-auto"
        />
      </div>
      <div className="flex flex-row items-end mx-3 transform -translate-y-1.5">
        <img src={StarCornerIcon} alt="Logo Icon" className="bg-cover w-4 h-5" />
        <div className="flex flex-row items-end mt-2 mx-auto">
          <h1 className="text-[18px] font-bold text-white">ราคา</h1>
          <h1 className="text-[18px] font-bold text-[#FFE176] mx-2">
            {minPrice} - {maxPrice}
          </h1>
          <h1 className="text-[18px] font-bold text-white">บาท</h1>
        </div>
        <img src={StarCornerIcon} alt="Logo Icon" className="bg-cover w-4 h-5" />
      </div>
      <div className="flex flex-col justify-center mx-auto mt-1 mb-3">
        <h1 className="text-3xl font-libre-bodoni font-{550} tracking-wide text-white drop-shadow-[4px_4px_2px_#442F5A] mb-2 flex justify-items-center justify-center">
          {name}
        </h1>

        <div className="flex flex-row space-x-4">
          <AppointmentIcon makeAppointment={makeAppointment} />
          <InformationIcon moreInformation={moreInformation} />
        </div>
      </div>
    </div>
  )
}
