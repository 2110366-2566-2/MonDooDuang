type SpecialityType = "" | "TAROT_CARD" | "ORACLE" | "THAI" | "NUMBER" | "RUNES"

export interface SearchSchema {
  name: string
  speciality: SpecialityType
  minPrice: number
  maxPrice: number
  startTime: string
  endTime: string
  startDate: string
  endDate: string
  rating: number
}
