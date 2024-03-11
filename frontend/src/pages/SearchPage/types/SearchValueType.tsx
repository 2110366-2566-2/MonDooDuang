type SearchValue = {
    name: string
    rating: number
    minPrice: number
    maxPrice: number
    image: string | null
    speciality: string
    chat: () => void
    moreInformation: () => void
    makeAppointment: () => void
    package_id_list: string[]
    fortunetellerid: string
  }