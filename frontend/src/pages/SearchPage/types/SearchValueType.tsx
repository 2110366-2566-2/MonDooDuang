type SearchValue = {
    name: string
    rating: number
    minPrice: number
    maxPrice: number
    image: string | null
    speciality: string[]
    chat: () => void
    moreInformation: () => void
    makeAppointment: () => void
    current_packageid: string
    packageid_list: string[]
    current_speciality: string
    speciality_list: string[]
    fortunetellerid: string
  }