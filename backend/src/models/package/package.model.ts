export type SpecialityType = "THAI" | "NUMBER" | "ORACLE" | "TAROT_CARD" | "RUNES" 

export interface PackageSchema{
    specialityType: SpecialityType,
    description: string,
    duration: number,
    price: number,
    fortunetellerId: string
}
