export type Speciality = "TAROT_CARD" | "THAI" | "NUMBER" | "ORACLE" | "RUNES"

export interface PackageTypes {
    packageId: String
    speciality: Speciality
    description: string
    duration: number
    price: number
    fortuneTellerId: string
}

export type FortuneTellerDetail = {
    fortunetellerId: string,
    stageName: string | null,
    description: string | null
}