export type SpecialityType = "THAI" | "NUMBER" | "ORACLE" | "TAROT_CARD" | "RUNES" 

export type PackageType = {
    packageId: string,
    specialityType: SpecialityType,
    description: string | null,
    duration: number,
    price: number,
    fortunetellerId: string
}

export type FortuneTellerDetail = {
    fortunetellerId: string,
    stageName: string | null,
    description: string | null
}