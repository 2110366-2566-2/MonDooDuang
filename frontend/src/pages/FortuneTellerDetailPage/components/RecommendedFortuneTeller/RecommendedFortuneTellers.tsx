import LeftLine from "../Line/LeftLine"
import RightLine from "../Line/RightLine"
import FortuneTellerSearchModal from "../../../SearchPage/components/FortuneTellerSearchModal/FortuneTellerSerachModal"
import { Specialities, specialitiesName } from "../../../SearchPage/types/SpecialityType"

import { useEffect, useState } from "react"
import { AuthContext } from "../../../../common/providers/AuthProvider"
import { useContext } from "react"

import { FortuneTellerService } from "../../services/FortuneTellerService"
import { environment } from "../../../../common/constants/environment"
import { ConversationService } from "../../services/ConversationService"

export default function RecommendedFortuneTellers() {
  const [recommendPackage, setRecommendPackage] = useState<SearchValue[] | null>(null)
  const { userId } = useContext(AuthContext)

  useEffect(() => {
    const fetchData = async () => {
      const data = await FortuneTellerService.getRecommendPackage()
      setRecommendPackage(
        await Promise.all((data as FetchSearchData[]).map(transformFetchDataToRecommendPackage))
      )
    }
    fetchData()
  }, [])

  const transformFetchDataToRecommendPackage = async (
    fetchSearchData: FetchSearchData
  ): Promise<SearchValue> => {
    return {
      name: fetchSearchData.stage_name ?? fetchSearchData.fname,
      rating:
        fetchSearchData.total_review === 0
          ? 0
          : fetchSearchData.total_score / fetchSearchData.total_review,
      minPrice: fetchSearchData.min_price,
      maxPrice: fetchSearchData.max_price,
      image: fetchSearchData.profile_picture,
      speciality: fetchSearchData.speciality_list
        .split(",")
        .map((speciality) => specialitiesName[speciality as Specialities]),
      chat: async () => {
        const { conversationId } = await ConversationService.createConversation(
          userId,
          fetchSearchData.fortune_teller_id
        )
        window.location.href = `${environment.frontend.url}/conversation/${conversationId}`
      },
      moreInformation: () => {
        window.location.href =
          environment.frontend.url + "/fortuneteller/" + fetchSearchData.fortune_teller_id
      },
      makeAppointment: () => {
        window.location.href =
          environment.frontend.url +
          "/appointment" +
          "/" +
          fetchSearchData.fortune_teller_id +
          "/" +
          fetchSearchData.current_packageid.split(",")[0]
      },
      current_packageid: fetchSearchData.current_packageid.split(",")[0],
      packageid_list: fetchSearchData.packageid_list.split(","),
      current_speciality: fetchSearchData.current_speciality.split(",")[0],
      speciality_list: fetchSearchData.speciality_list.split(","),
      fortunetellerid: fetchSearchData.fortune_teller_id
    }
  }

  return (
    <div>
      <div className="flex flex-row space-x-4 items-center justify-center">
        <LeftLine></LeftLine>
        <div className="font-medium text-[24px]">คุณอาจสนใจหมอดูเหล่านี้</div>
        <RightLine></RightLine>
      </div>
      <div className="flex flex-row w-full scroll-smooth overflow-auto space-x-4">
        <div className="h-[430px] w-full grid gap-0 grid-cols-4 justify-items-center mx-8 -z-0 text-[16px]">
          {recommendPackage && recommendPackage.length > 0
            ? recommendPackage.map((fortunetellerInformation, index) => (
              <FortuneTellerSearchModal key={index} {...fortunetellerInformation} />
            ))
            : null}
        </div>
      </div>
    </div>
  )
}
