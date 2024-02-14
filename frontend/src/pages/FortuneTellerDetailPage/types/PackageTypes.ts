export type Speciality = "TAROT_CARD" | "THAI" | "NUMBER" | "ORACLE" | "RUNES"

export interface PackageTypes {
    speciality: Speciality
    description: string
    duration: number
    price: number
    fortuneTellerId: string
}